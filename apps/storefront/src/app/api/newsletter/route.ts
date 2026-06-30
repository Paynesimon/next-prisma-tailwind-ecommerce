import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

function isValidEmail(email: string) {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
   try {
      const body = await req.json()
      const email = String(body?.email || '')
         .trim()
         .toLowerCase()

      if (!email || !isValidEmail(email)) {
         return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
      }

      await prisma.user.upsert({
         where: { email },
         update: { isEmailSubscribed: true },
         create: {
            email,
            isEmailSubscribed: true,
         },
      })

      return NextResponse.json({ ok: true })
   } catch {
      return NextResponse.json({ error: 'server_error' }, { status: 500 })
   }
}
