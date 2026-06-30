'use client'

import { CartContextProvider } from '@/state/Cart'
import type { StorefrontTheme } from '@/lib/theme'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import { CartGrid } from '@/app/(store)/(routes)/cart/components/grid'
import {
   cartLayoutShellClass,
   getCartCopy,
} from '@/themes/cart/copy'

export function ThemedCartPage({ theme }: { theme: StorefrontTheme }) {
   const copy = getCartCopy()

   return (
      <CartContextProvider>
         <div className={cartLayoutShellClass(theme)}>
            <CartPageHeader theme={theme} title={copy.title} description={copy.description} />
            <CartGrid theme={theme} />
            <CartPageFooter theme={theme} continueLabel={copy.continueShopping} trustNote={copy.trustNote} />
         </div>
      </CartContextProvider>
   )
}

function CartPageHeader({
   theme,
   title,
   description,
}: {
   theme: StorefrontTheme
   title: string
   description: string
}) {
   if (theme === 'blog') {
      return (
         <header className="space-y-2 border-b pb-6 text-center md:text-left">
            <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
               {title}
            </h1>
            <p className="text-muted-foreground">{description}</p>
         </header>
      )
   }

   if (theme === 'corporate') {
      return (
         <header className="space-y-2 border-b border-border/60 pb-6">
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
               {title}
            </h1>
            <p className="text-sm text-muted-foreground md:text-base">
               {description}
            </p>
         </header>
      )
   }

   if (theme === 'shop') {
      return (
         <header className="my-4 space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground md:text-base">
               {description}
            </p>
         </header>
      )
   }

   return null
}

function CartPageFooter({
   theme,
   continueLabel,
   trustNote,
}: {
   theme: StorefrontTheme
   continueLabel: string
   trustNote?: string
}) {
   return (
      <div
         className={cn(
            'flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between',
            theme === 'blog' && 'justify-center text-center'
         )}
      >
         <Link href="/products" className="hover:text-primary">
            ← {continueLabel}
         </Link>
         {theme === 'corporate' && trustNote ? (
            <p className="text-xs">{trustNote}</p>
         ) : null}
      </div>
   )
}
