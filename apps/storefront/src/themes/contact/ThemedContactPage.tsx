import { ContactForm } from '@/components/feedback/ContactForm'
import { WholesaleContact } from '@/components/native/WholesaleContact'
import { config } from '@/lib/config'
import { getFeedbackCopy } from '@/lib/feedback-copy'
import type { StorefrontTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

export function ThemedContactPage({ theme }: { theme: StorefrontTheme }) {
   const copy = getFeedbackCopy()

   return (
      <div
         className={cn(
            'mx-auto max-w-3xl space-y-10 py-8',
            theme === 'blog' && 'max-w-4xl'
         )}
      >
         <header className="space-y-3">
            <h1
               className={cn(
                  'text-3xl font-bold tracking-tight md:text-4xl',
                  theme === 'blog' && 'font-serif md:text-5xl',
                  theme === 'corporate' && 'text-foreground'
               )}
            >
               {copy.contactTitle}
            </h1>
            <p className="text-muted-foreground md:text-lg">{copy.contactDesc}</p>
         </header>

         <div className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-2">
               <WholesaleContact />
               {config.store.telegramLink ? (
                  <p className="text-sm text-muted-foreground">
                     Telegram:{' '}
                     <a
                        href={config.store.telegramLink}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                     >
                        {config.store.telegramLink}
                     </a>
                  </p>
               ) : null}
            </div>
            <div className="lg:col-span-3">
               <ContactForm theme={theme} />
            </div>
         </div>
      </div>
   )
}
