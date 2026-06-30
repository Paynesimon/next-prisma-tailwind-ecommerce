import { isFeatureEnabled } from '@/lib/features'
import prisma from '@/lib/prisma'
import { getOptionalUserId } from '@/lib/request-auth'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

type RouteContext = { params: { slug: string } }

export async function GET(_req: Request, { params }: RouteContext) {
   try {
      if (!isFeatureEnabled('blogComments')) {
         return NextResponse.json({ comments: [] })
      }
      const comments = await prisma.blogComment.findMany({
         where: { blogSlug: params.slug, status: 'Approved' },
         include: {
            user: { select: { name: true } },
         },
         orderBy: { createdAt: 'asc' },
      })

      return NextResponse.json({ comments })
   } catch (error) {
      console.error('[BLOG_COMMENTS_GET]', error)
      return NextResponse.json({ error: 'server_error' }, { status: 500 })
   }
}

export async function POST(req: Request, { params }: RouteContext) {
   try {
      if (!isFeatureEnabled('blogComments')) {
         return NextResponse.json({ error: 'disabled' }, { status: 403 })
      }

      const blog = await prisma.blog.findUnique({
         where: { slug: params.slug },
      })

      if (!blog) {
         return NextResponse.json({ error: 'not_found' }, { status: 404 })
      }

      const body = await req.json()
      const content = String(body?.content || '').trim()
      const userId = (await getOptionalUserId(req)) || null
      const guestName = body?.guestName ? String(body.guestName).trim() : null
      const guestEmail = body?.guestEmail
         ? String(body.guestEmail).trim().toLowerCase()
         : null

      if (body?.website) {
         return NextResponse.json({ ok: true, pending: true })
      }

      if (!content || content.length < 3) {
         return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
      }

      if (!userId && (!guestName || !guestEmail)) {
         return NextResponse.json({ error: 'guest_info_required' }, { status: 400 })
      }

      const comment = await prisma.blogComment.create({
         data: {
            blogSlug: params.slug,
            content,
            userId,
            guestName: userId ? null : guestName,
            guestEmail: userId ? null : guestEmail,
            status: 'Pending',
         },
      })

      return NextResponse.json({ comment, pending: true })
   } catch (error) {
      console.error('[BLOG_COMMENTS_POST]', error)
      return NextResponse.json({ error: 'server_error' }, { status: 500 })
   }
}
