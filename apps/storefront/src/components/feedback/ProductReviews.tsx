'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { StarRating } from '@/components/feedback/StarRating'
import { feedbackSectionClass, getFeedbackCopy } from '@/lib/feedback-copy'
import { isFeatureEnabled } from '@/lib/features'
import { useAuthenticated } from '@/hooks/useAuthentication'
import type { StorefrontTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

type Review = {
   id: string
   text: string
   rating: number
   isVerified: boolean
   createdAt: string
   user?: { name?: string | null }
}

export function ProductReviews({
   productId,
   theme = 'shop',
}: {
   productId: string
   theme?: StorefrontTheme
}) {
   if (!isFeatureEnabled('productReviews')) return null

   const copy = getFeedbackCopy()
   const { authenticated } = useAuthenticated()
   const [reviews, setReviews] = useState<Review[]>([])
   const [avg, setAvg] = useState(0)
   const [count, setCount] = useState(0)
   const [eligibility, setEligibility] = useState<{
      hasReviewed: boolean
      canReview: boolean
   } | null>(null)
   const [rating, setRating] = useState(5)
   const [text, setText] = useState('')
   const [loading, setLoading] = useState(false)
   const [loaded, setLoaded] = useState(false)
   const [message, setMessage] = useState('')

   const load = useCallback(async () => {
      const res = await fetch(`/api/reviews?productId=${productId}`, {
         cache: 'no-store',
         credentials: 'include',
      })
      const data = await res.json()
      setReviews(data.reviews || [])
      setAvg(data.avg || 0)
      setCount(data.count || 0)
      setEligibility(data.eligibility ?? null)
      setLoaded(true)
   }, [productId])

   useEffect(() => {
      load()
   }, [load, authenticated])

   async function onSubmit(e: React.FormEvent) {
      e.preventDefault()
      setLoading(true)
      setMessage('')

      try {
         const res = await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, rating, text }),
         })
         const data = await res.json()

         if (res.status === 403) {
            setMessage(copy.reviewPurchaseRequired)
            return
         }
         if (res.status === 409) {
            setMessage(copy.reviewAlready)
            return
         }
         if (!res.ok) {
            setMessage(copy.error)
            return
         }

         setMessage(copy.reviewPending)
         setText('')
         await load()
      } catch {
         setMessage(copy.error)
      } finally {
         setLoading(false)
      }
   }

   return (
      <section className={cn('mt-10 space-y-6', feedbackSectionClass(theme))}>
         <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
               <h2
                  className={cn(
                     'text-xl font-bold',
                     theme === 'blog' && 'font-serif text-2xl'
                  )}
               >
                  {copy.reviewsTitle}
               </h2>
               {count > 0 ? (
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                     <StarRating value={Math.round(avg)} readonly size="sm" />
                     <span>
                        {avg.toFixed(1)} · {count}
                     </span>
                  </div>
               ) : (
                  <p className="mt-1 text-sm text-muted-foreground">
                     {copy.reviewsEmpty}
                  </p>
               )}
            </div>
         </div>

         <div className="space-y-4">
            {reviews.map((review) => (
               <article
                  key={review.id}
                  className="border-b pb-4 last:border-0"
               >
                  <div className="flex flex-wrap items-center gap-2">
                     <StarRating value={review.rating} readonly size="sm" />
                     <span className="text-sm font-medium">
                        {review.user?.name || 'Customer'}
                     </span>
                     {review.isVerified ? (
                        <span className="text-xs text-muted-foreground">
                           · {copy.verifiedPurchase}
                        </span>
                     ) : null}
                     <time className="text-xs text-muted-foreground">
                        {format(new Date(review.createdAt), 'PPP')}
                     </time>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed">{review.text}</p>
               </article>
            ))}
         </div>

         <div className="border-t pt-6">
            {!authenticated ? (
               <p className="text-sm text-muted-foreground">
                  {copy.reviewLogin}{' '}
                  <Link href="/login" className="underline">
                     Sign in
                  </Link>
               </p>
            ) : !loaded ? (
               <p className="text-sm text-muted-foreground">…</p>
            ) : eligibility?.hasReviewed ? (
               <p className="text-sm text-muted-foreground">{copy.reviewAlready}</p>
            ) : eligibility?.canReview === false ? (
               <p className="text-sm text-muted-foreground">
                  {copy.reviewPurchaseRequired}
               </p>
            ) : (
               <form onSubmit={onSubmit} className="space-y-4">
                  <h3 className="font-medium">{copy.writeReview}</h3>
                  <div className="space-y-2">
                     <Label>{copy.rating}</Label>
                     <StarRating value={rating} onChange={setRating} />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="review-text">{copy.reviewText}</Label>
                     <Textarea
                        id="review-text"
                        required
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                     />
                  </div>
                  <Button type="submit" disabled={loading}>
                     {copy.reviewSubmit}
                  </Button>
                  {message ? (
                     <p className="text-sm text-muted-foreground">{message}</p>
                  ) : null}
               </form>
            )}
         </div>
      </section>
   )
}
