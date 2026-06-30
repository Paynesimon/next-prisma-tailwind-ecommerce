import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(
   req: Request,
   { params }: { params: { id: string } }
) {
   try {
      const { status } = await req.json()
      const allowed = ['New', 'Read', 'Replied', 'Archived']
      if (!allowed.includes(status)) {
         return NextResponse.json({ error: 'invalid_status' }, { status: 400 })
      }

      const message = await prisma.contactMessage.update({
         where: { id: params.id },
         data: { status },
      })

      return NextResponse.json(message)
   } catch (error) {
      console.error('[MESSAGE_PATCH]', error)
      return NextResponse.json({ error: 'server_error' }, { status: 500 })
   }
}
