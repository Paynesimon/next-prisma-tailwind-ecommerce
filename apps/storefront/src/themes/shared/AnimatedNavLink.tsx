'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'

export function AnimatedNavLink({
   href,
   label,
   active,
   onClick,
   variant = 'default',
}: {
   href: string
   label: string
   active: boolean
   onClick?: () => void
   variant?: 'default' | 'blog'
}) {
   return (
      <Link
         href={href}
         onClick={onClick}
         className={cn(
            'group relative px-3 py-2 text-sm transition-colors',
            variant === 'blog' && 'font-medium',
            active
               ? 'font-medium text-foreground'
               : 'text-muted-foreground hover:text-foreground'
         )}
      >
         {label}
         <span
            aria-hidden
            className={cn(
               'absolute bottom-0 left-3 right-3 h-0.5 rounded-full transition-transform duration-300 ease-out',
               variant === 'blog' ? 'bg-foreground' : 'bg-primary',
               active
                  ? 'scale-x-100'
                  : 'scale-x-0 origin-left group-hover:scale-x-100'
            )}
         />
      </Link>
   )
}
