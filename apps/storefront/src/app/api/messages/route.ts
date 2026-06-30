import config from '@/config/site'
import { config as storeConfig } from '@/lib/config'
import { isFeatureEnabled } from '@/lib/features'
import prisma from '@/lib/prisma'
import { getOptionalUserId } from '@/lib/request-auth'
import { sendMail } from '@persepolis/mail'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function isValidEmail(email: string) {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
   try {
      if (!isFeatureEnabled('contactMessages')) {
         return NextResponse.json({ error: 'disabled' }, { status: 403 })
      }

      const body = await req.json()
      const name = String(body?.name || '').trim()
      const email = String(body?.email || '')
         .trim()
         .toLowerCase()
      const phone = body?.phone ? String(body.phone).trim() : null
      const subject = body?.subject ? String(body.subject).trim() : null
      const content = String(body?.content || '').trim()
      const productId = body?.productId ? String(body.productId) : null
      const source = String(body?.source || 'contact').trim() || 'contact'

      if (body?.website) {
         return NextResponse.json({ ok: true })
      }

      if (!name || !email || !isValidEmail(email) || content.length < 5) {
         return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
      }

      const userId = (await getOptionalUserId(req)) || req.headers.get('X-USER-ID') || null

      const message = await prisma.contactMessage.create({
         data: {
            name,
            email,
            phone,
            subject,
            content,
            productId,
            userId,
            source,
            status: 'New',
         },
      })

      const owners = await prisma.owner.findMany()
      const notifyEmail =
         storeConfig.store.contactEmail || owners[0]?.email || null

      if (notifyEmail) {
         const productLine = productId ? `\nProduct ID: ${productId}` : ''
         await sendMail({
            name: config.name,
            to: notifyEmail,
            subject: `[${storeConfig.store.name}] New message from ${name}`,
            html: `<p><strong>${name}</strong> (${email})</p>
<p>${subject ? `Subject: ${subject}<br/>` : ''}${phone ? `Phone: ${phone}<br/>` : ''}Source: ${source}${productLine}</p>
<p>${content.replace(/\n/g, '<br/>')}</p>`,
         }).catch((err) => console.error('[MESSAGE_MAIL]', err))
      }

      return NextResponse.json({ ok: true, id: message.id })
   } catch (error) {
      console.error('[MESSAGES_POST]', error)
      return NextResponse.json({ error: 'server_error' }, { status: 500 })
   }
}
