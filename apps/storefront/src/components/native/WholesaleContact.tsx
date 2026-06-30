import { getMessages } from '@/i18n'
import { config } from '@/lib/config'
import { Mail, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function WholesaleContact() {
   const copy = getMessages().wholesale
   const email = config.store.contactEmail?.trim()
   const whatsapp = config.store.whatsappLink?.trim()

   if (!email && !whatsapp) return null

   return (
      <div className="rounded-md border border-dashed p-4 space-y-2">
         <p className="text-sm font-medium">{copy.title}</p>
         <p className="text-xs text-muted-foreground">{copy.hint}</p>
         <div className="flex flex-wrap gap-2">
            {email ? (
               <Link
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
               >
                  <Mail className="h-4 w-4" />
                  {copy.email}
               </Link>
            ) : null}
            {whatsapp ? (
               <Link
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
               >
                  <MessageCircle className="h-4 w-4" />
                  {copy.whatsapp}
               </Link>
            ) : null}
         </div>
      </div>
   )
}
