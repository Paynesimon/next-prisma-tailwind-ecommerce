import Link from 'next/link'
import { ArrowRight, Mail, MessageCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { config } from '@/lib/config'

import { getCorporateHomeCopy } from './copy'

export function ContactCTA() {
   const copy = getCorporateHomeCopy()
   const email = config.store.contactEmail?.trim()
   const whatsapp = config.store.whatsappLink?.trim()

   return (
      <section className="relative overflow-hidden rounded-2xl bg-foreground px-6 py-12 text-background md:px-12 md:py-16">
         <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
         <div className="relative mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
               {copy.ctaTitle}
            </h2>
            <p className="text-sm text-background/80 md:text-base">{copy.ctaDesc}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
               {email ? (
                  <Button
                     asChild
                     size="lg"
                     variant="secondary"
                     className="gap-2"
                  >
                     <Link href={`mailto:${email}`}>
                        <Mail className="h-4 w-4" />
                        {copy.ctaContact}
                     </Link>
                  </Button>
               ) : (
                  <Button asChild size="lg" variant="secondary" className="gap-2">
                     <Link href="/contact">
                        {copy.ctaContact}
                        <ArrowRight className="h-4 w-4" />
                     </Link>
                  </Button>
               )}
               <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
               >
                  <Link href="/products">{copy.ctaCatalog}</Link>
               </Button>
               {whatsapp ? (
                  <Button
                     asChild
                     size="lg"
                     variant="outline"
                     className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
                  >
                     <Link href={whatsapp} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                     </Link>
                  </Button>
               ) : null}
            </div>
         </div>
      </section>
   )
}
