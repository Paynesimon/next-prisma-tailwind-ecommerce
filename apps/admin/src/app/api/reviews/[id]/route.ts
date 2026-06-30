import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(
   req: Request,
   { params }: { params: { id: string } }
) {
   try {
      const { status } = await req.json()
      const allowed = ['Pending', 'Approved', 'Rejected']
      if (!allowed.includes(status)) {
         return NextResponse.json({ error: 'invalid_status' }, { status: 400 })
      }

      const review = await prisma.productReview.update({
         where: { id: params.id },
         data: { status },
      })

      return NextResponse.json(review)
   } catch (error) {
      console.error('[REVIEW_PATCH]', error)
      return NextResponse.json({ error: 'server_error' }, { status: 500 })
   }
}
