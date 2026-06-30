'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import { getCorporateNavCopy } from './nav-copy'

export function FooterNewsletter({ className }: { className?: string }) {
   const copy = getCorporateNavCopy()
   const [email, setEmail] = useState('')
   const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
      'idle'
   )

   async function onSubmit(e: React.FormEvent) {
      e.preventDefault()
      if (!email.trim()) return

      setStatus('loading')
      try {
         const res = await fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.trim() }),
         })
         if (!res.ok) throw new Error('failed')
         setStatus('success')
         setEmail('')
      } catch {
         setStatus('error')
      }
   }

   return (
      <div className={cn('space-y-3', className)}>
         <div>
            <p className="text-sm font-semibold text-background">
               {copy.newsletterTitle}
            </p>
            <p className="mt-1 text-sm text-background/65">{copy.newsletterDesc}</p>
         </div>
         <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
            <Input
               type="email"
               required
               value={email}
               onChange={(e) => {
                  setEmail(e.target.value)
                  if (status !== 'idle') setStatus('idle')
               }}
               placeholder={copy.newsletterPlaceholder}
               className="h-10 border-background/20 bg-background/10 text-background placeholder:text-background/45 focus-visible:ring-background/30"
               disabled={status === 'loading' || status === 'success'}
            />
            <Button
               type="submit"
               variant="secondary"
               className="shrink-0"
               disabled={status === 'loading' || status === 'success'}
            >
               {status === 'loading' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
               ) : (
                  copy.newsletterSubmit
               )}
            </Button>
         </form>
         {status === 'success' ? (
            <p className="text-xs text-emerald-300">{copy.newsletterSuccess}</p>
         ) : null}
         {status === 'error' ? (
            <p className="text-xs text-red-300">{copy.newsletterError}</p>
         ) : null}
      </div>
   )
}
