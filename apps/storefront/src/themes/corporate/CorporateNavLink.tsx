'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'

export function CorporateNavLink({
   href,
   label,
   active,
   onClick,
}: {
   href: string
   label: string
   active: boolean
   onClick?: () => void
}) {
   return (
      <Link
         href={href}
         onClick={onClick}
         className={cn(
            'group relative px-3 py-2 text-sm transition-colors',
            active
               ? 'font-medium text-foreground'
               : 'text-muted-foreground hover:text-foreground'
         )}
      >
         {label}
         <span
            aria-hidden
            className={cn(
               'absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary transition-transform duration-300 ease-out',
               active
                  ? 'scale-x-100'
                  : 'scale-x-0 origin-left group-hover:scale-x-100'
            )}
         />
      </Link>
   )
}

export function CorporateMobileNavLink({
   href,
   label,
   active,
   onClick,
}: {
   href: string
   label: string
   active: boolean
   onClick?: () => void
}) {
   return (
      <Link
         href={href}
         onClick={onClick}
         className={cn(
            'relative rounded-md py-2.5 pl-3 pr-3 text-sm transition',
            active
               ? 'bg-muted font-medium text-foreground'
               : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
         )}
      >
         <span
            aria-hidden
            className={cn(
               'absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-primary transition-opacity duration-300',
               active ? 'opacity-100' : 'opacity-0'
            )}
         />
         {label}
      </Link>
   )
}
