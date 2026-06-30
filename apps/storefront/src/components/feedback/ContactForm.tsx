'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { feedbackSectionClass, getFeedbackCopy } from '@/lib/feedback-copy'
import { isFeatureEnabled } from '@/lib/features'
import type { StorefrontTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type ContactFormProps = {
   theme?: StorefrontTheme
   productId?: string
   source?: string
   defaultSubject?: string
   compact?: boolean
}

export function ContactForm({
   theme = 'shop',
   productId,
   source = 'contact',
   defaultSubject = '',
   compact = false,
}: ContactFormProps) {
   if (!isFeatureEnabled('contactMessages')) return null

   const copy = getFeedbackCopy()
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [phone, setPhone] = useState('')
   const [subject, setSubject] = useState(defaultSubject)
   const [content, setContent] = useState('')
   const [website, setWebsite] = useState('')
   const [loading, setLoading] = useState(false)
   const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

   async function onSubmit(e: React.FormEvent) {
      e.preventDefault()
      setLoading(true)
      setStatus('idle')

      try {
         const res = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               name,
               email,
               phone,
               subject,
               content,
               productId,
               source,
               website,
            }),
         })

         if (!res.ok) {
            setStatus('error')
            return
         }

         setStatus('success')
         setContent('')
         if (!defaultSubject) setSubject('')
      } catch {
         setStatus('error')
      } finally {
         setLoading(false)
      }
   }

   return (
      <form
         onSubmit={onSubmit}
         className={cn(
            compact ? 'space-y-3' : 'space-y-4',
            !compact && feedbackSectionClass(theme)
         )}
      >
         <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
         />
         <div className={cn('grid gap-4', compact ? 'grid-cols-1' : 'sm:grid-cols-2')}>
            <div className="space-y-2">
               <Label htmlFor="contact-name">{copy.name}</Label>
               <Input
                  id="contact-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
            </div>
            <div className="space-y-2">
               <Label htmlFor="contact-email">{copy.email}</Label>
               <Input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
         </div>
         <div className="space-y-2">
            <Label htmlFor="contact-phone">{copy.phone}</Label>
            <Input
               id="contact-phone"
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
            />
         </div>
         {!compact ? (
            <div className="space-y-2">
               <Label htmlFor="contact-subject">{copy.subject}</Label>
               <Input
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
               />
            </div>
         ) : null}
         <div className="space-y-2">
            <Label htmlFor="contact-message">{copy.message}</Label>
            <Textarea
               id="contact-message"
               required
               rows={compact ? 3 : 5}
               value={content}
               onChange={(e) => setContent(e.target.value)}
            />
         </div>
         <Button type="submit" disabled={loading}>
            {loading
               ? copy.submitting
               : compact
                 ? copy.inquirySubmit
                 : copy.submit}
         </Button>
         {status === 'success' ? (
            <p className="text-sm text-emerald-600">{copy.success}</p>
         ) : null}
         {status === 'error' ? (
            <p className="text-sm text-destructive">{copy.error}</p>
         ) : null}
      </form>
   )
}
