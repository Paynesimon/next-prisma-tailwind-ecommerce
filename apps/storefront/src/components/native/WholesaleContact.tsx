import { config } from '@/lib/config'
import { getLocale } from '@/lib/locale'
import { Mail, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const COPY: Record<
   string,
   { title: string; hint: string; email: string; whatsapp: string }
> = {
   en: {
      title: 'Need a custom order?',
      hint: 'For special quantities or requirements, contact us directly.',
      email: 'Email us',
      whatsapp: 'WhatsApp',
   },
   zh: {
      title: '有特殊需求？',
      hint: '如需特殊数量或定制要求，请通过邮件或 WhatsApp 联系我们。',
      email: '发送邮件',
      whatsapp: 'WhatsApp 沟通',
   },
   ja: {
      title: 'カスタム注文がありますか？',
      hint: '数量や仕様のご相談はメールまたは WhatsApp まで。',
      email: 'メール',
      whatsapp: 'WhatsApp',
   },
}

function copy() {
   const lang = getLocale().language
   return COPY[lang] || COPY[lang.split('-')[0]] || COPY.en
}

export function WholesaleContact() {
   const email = config.store.contactEmail?.trim()
   const whatsapp = config.store.whatsappLink?.trim()

   if (!email && !whatsapp) return null

   const text = copy()

   return (
      <div className="rounded-md border border-dashed p-4 space-y-2">
         <p className="text-sm font-medium">{text.title}</p>
         <p className="text-xs text-muted-foreground">{text.hint}</p>
         <div className="flex flex-wrap gap-2">
            {email ? (
               <Link
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
               >
                  <Mail className="h-4 w-4" />
                  {text.email}
               </Link>
            ) : null}
            {whatsapp ? (
               <Link
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
               >
                  <MessageCircle className="h-4 w-4" />
                  {text.whatsapp}
               </Link>
            ) : null}
         </div>
      </div>
   )
}
