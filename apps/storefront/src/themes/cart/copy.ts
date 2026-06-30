import { getMessages } from '@/i18n'
import type { StorefrontTheme } from '@/lib/theme'

export type CartCopy = {
   title: string
   description: string
   empty: string
   receipt: string
   total: string
   discount: string
   tax: string
   payable: string
   checkout: string
   checkoutLoading: string
   continueShopping: string
   trustNote?: string
}

export function getCartCopy(): CartCopy {
   return getMessages().cart
}

export function cartLayoutShellClass(theme: StorefrontTheme): string {
   switch (theme) {
      case 'corporate':
         return 'corporate-cart max-w-5xl mx-auto space-y-8'
      case 'blog':
         return 'blog-cart max-w-4xl mx-auto space-y-8'
      default:
         return 'shop-cart space-y-6'
   }
}

export function cartGridClass(theme: StorefrontTheme): string {
   switch (theme) {
      case 'corporate':
         return 'gap-8 lg:grid-cols-[1fr_320px]'
      case 'blog':
         return 'gap-8 lg:grid-cols-1 max-w-3xl mx-auto'
      default:
         return 'gap-4 md:grid-cols-3'
   }
}

export function cartItemsColClass(theme: StorefrontTheme): string {
   switch (theme) {
      case 'corporate':
         return 'lg:col-span-1 space-y-4'
      case 'blog':
         return 'space-y-4'
      default:
         return 'md:col-span-2 space-y-3'
   }
}

export function receiptCardClass(theme: StorefrontTheme): string {
   switch (theme) {
      case 'corporate':
         return 'border bg-card shadow-sm'
      case 'blog':
         return 'border-dashed bg-muted/30'
      default:
         return 'border-2 border-primary/15 shadow-md'
   }
}
