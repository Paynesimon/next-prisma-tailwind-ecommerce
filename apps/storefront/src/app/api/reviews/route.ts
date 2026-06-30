import { isFeatureEnabled } from '@/lib/features'
import prisma from '@/lib/prisma'
import { getOptionalUserId } from '@/lib/request-auth'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
   try {
      if (!isFeatureEnabled('productReviews')) {
         return NextResponse.json({ reviews: [], avg: 0, count: 0, eligibility: null })
      }
      const { searchParams } = new URL(req.url)
      const productId = searchParams.get('productId')

      if (!productId) {
         return NextResponse.json({ error: 'productId required' }, { status: 400 })
      }

      const reviews = await prisma.productReview.findMany({
         where: { productId, status: 'Approved' },
         include: {
            user: { select: { name: true } },
         },
         orderBy: { createdAt: 'desc' },
      })

      const avg =
         reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0

      const userId = await getOptionalUserId(req)
      let eligibility = null

      if (userId) {
         const mine = await prisma.productReview.findUnique({
            where: {
               UniqueProductProductReview: { productId, userId },
            },
         })
         const paid = await prisma.orderItem.findFirst({
            where: {
               productId,
               order: { userId, isPaid: true },
            },
         })
         eligibility = {
            hasReviewed: !!mine,
            canReview: !!paid && !mine,
            myReview: mine,
         }
      }

      return NextResponse.json({ reviews, avg, count: reviews.length, eligibility })
   } catch (error) {
      console.error('[REVIEWS_GET]', error)
      return NextResponse.json({ error: 'server_error' }, { status: 500 })
   }
}

export async function POST(req: Request) {
   try {
      if (!isFeatureEnabled('productReviews')) {
         return NextResponse.json({ error: 'disabled' }, { status: 403 })
      }

      const userId = req.headers.get('X-USER-ID')
      if (!userId) {
         return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
      }

      const body = await req.json()
      const productId = String(body?.productId || '')
      const text = String(body?.text || '').trim()
      const rating = Number(body?.rating)

      if (!productId || !text || text.length < 5) {
         return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
      }
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
         return NextResponse.json({ error: 'invalid_rating' }, { status: 400 })
      }

      const paidOrder = await prisma.orderItem.findFirst({
         where: {
            productId,
            order: { userId, isPaid: true },
         },
         select: { orderId: true },
      })

      if (!paidOrder) {
         return NextResponse.json(
            { error: 'purchase_required' },
            { status: 403 }
         )
      }

      const existing = await prisma.productReview.findUnique({
         where: {
            UniqueProductProductReview: { productId, userId },
         },
      })

      if (existing) {
         return NextResponse.json({ error: 'already_reviewed' }, { status: 409 })
      }

      const review = await prisma.productReview.create({
         data: {
            productId,
            userId,
            text,
            rating,
            orderId: paidOrder.orderId,
            isVerified: true,
            status: 'Pending',
         },
      })

      return NextResponse.json({ review, pending: true })
   } catch (error) {
      console.error('[REVIEWS_POST]', error)
      return NextResponse.json({ error: 'server_error' }, { status: 500 })
   }
}
