'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({
   value,
   onChange,
   readonly = false,
   size = 'md',
}: {
   value: number
   onChange?: (n: number) => void
   readonly?: boolean
   size?: 'sm' | 'md'
}) {
   const iconClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'

   return (
      <div className="flex items-center gap-0.5">
         {[1, 2, 3, 4, 5].map((star) => (
            <button
               key={star}
               type="button"
               disabled={readonly}
               onClick={() => onChange?.(star)}
               className={cn(
                  readonly ? 'cursor-default' : 'cursor-pointer hover:scale-105',
                  'transition'
               )}
               aria-label={`${star} stars`}
            >
               <Star
                  className={cn(
                     iconClass,
                     star <= value
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground/40'
                  )}
               />
            </button>
         ))}
      </div>
   )
}
