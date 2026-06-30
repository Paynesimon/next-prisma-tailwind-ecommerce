'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { feedbackSectionClass, getFeedbackCopy } from '@/lib/feedback-copy'
import { isFeatureEnabled } from '@/lib/features'
import { useAuthenticated } from '@/hooks/useAuthentication'
import type { StorefrontTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'

type Comment = {
   id: string
   content: string
   createdAt: string
   guestName?: string | null
   user?: { name?: string | null }
}

export function BlogComments({
   slug,
   theme = 'blog',
}: {
   slug: string
   theme?: StorefrontTheme
}) {
   if (!isFeatureEnabled('blogComments')) return null

   const copy = getFeedbackCopy()
   const { authenticated } = useAuthenticated()
   const [comments, setComments] = useState<Comment[]>([])
   const [content, setContent] = useState('')
   const [guestName, setGuestName] = useState('')
   const [guestEmail, setGuestEmail] = useState('')
   const [website, setWebsite] = useState('')
   const [loading, setLoading] = useState(false)
   const [message, setMessage] = useState('')

   const load = useCallback(async () => {
      const res = await fetch(`/api/blog/${slug}/comments`, { cache: 'no-store' })
      const data = await res.json()
      setComments(data.comments || [])
   }, [slug])

   useEffect(() => {
      load()
   }, [load])

   async function onSubmit(e: React.FormEvent) {
      e.preventDefault()
      setLoading(true)
      setMessage('')

      try {
         const res = await fetch(`/api/blog/${slug}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ content, guestName, guestEmail, website }),
         })

         if (!res.ok) {
            setMessage(copy.error)
            return
         }

         setMessage(copy.commentPending)
         setContent('')
         await load()
      } catch {
         setMessage(copy.error)
      } finally {
         setLoading(false)
      }
   }

   return (
      <section className={cn('mt-12 space-y-6 border-t pt-10', feedbackSectionClass(theme))}>
         <h2
            className={cn(
               'text-xl font-bold',
               theme === 'blog' && 'font-serif text-2xl'
            )}
         >
            {copy.commentsTitle}
         </h2>

         {comments.length ? (
            <ul className="space-y-6">
               {comments.map((comment) => (
                  <li key={comment.id} className="space-y-1">
                     <p className="text-sm font-medium">
                        {comment.user?.name || comment.guestName || 'Guest'}
                     </p>
                     <time className="text-xs text-muted-foreground">
                        {format(new Date(comment.createdAt), 'PPP')}
                     </time>
                     <p className="text-sm leading-relaxed text-muted-foreground">
                        {comment.content}
                     </p>
                  </li>
               ))}
            </ul>
         ) : (
            <p className="text-sm text-muted-foreground">{copy.commentsEmpty}</p>
         )}

         <form onSubmit={onSubmit} className="space-y-4">
            {!authenticated ? (
               <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                     <Label htmlFor="comment-name">{copy.commentName}</Label>
                     <Input
                        id="comment-name"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="comment-email">{copy.commentEmail}</Label>
                     <Input
                        id="comment-email"
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                     />
                  </div>
               </div>
            ) : null}
            <input
               type="text"
               name="website"
               value={website}
               onChange={(e) => setWebsite(e.target.value)}
               className="hidden"
               tabIndex={-1}
               autoComplete="off"
            />
            <div className="space-y-2">
               <Label htmlFor="comment-text">{copy.commentText}</Label>
               <Textarea
                  id="comment-text"
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
               />
            </div>
            <Button type="submit" disabled={loading}>
               {copy.commentSubmit}
            </Button>
            {message ? (
               <p className="text-sm text-muted-foreground">{message}</p>
            ) : null}
         </form>
      </section>
   )
}
