import { getLocale } from '@/lib/locale'
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

const COPY: Record<string, Omit<CartCopy, 'trustNote'> & { trustNote?: string }> = {
   en: {
      title: 'Cart',
      description: 'Review items before checkout.',
      empty: 'Your cart is empty.',
      receipt: 'Order summary',
      total: 'Subtotal',
      discount: 'Discount',
      tax: 'Tax',
      payable: 'Total',
      checkout: 'Checkout',
      checkoutLoading: 'Processing…',
      continueShopping: 'Continue shopping',
      trustNote: 'Secure checkout via Stripe.',
   },
   zh: {
      title: '购物车',
      description: '确认商品后前往结账。',
      empty: '购物车还是空的。',
      receipt: '订单摘要',
      total: '小计',
      discount: '优惠',
      tax: '税费',
      payable: '应付总额',
      checkout: '去结账',
      checkoutLoading: '处理中…',
      continueShopping: '继续购物',
      trustNote: 'Stripe 安全支付。',
   },
   ja: {
      title: 'カート',
      description: 'ご注文前に内容をご確認ください。',
      empty: 'カートは空です。',
      receipt: '注文概要',
      total: '小計',
      discount: '割引',
      tax: '税',
      payable: '合計',
      checkout: 'チェックアウト',
      checkoutLoading: '処理中…',
      continueShopping: '買い物を続ける',
      trustNote: 'Stripe による安全な決済。',
   },
}

export function getCartCopy(): CartCopy {
   const lang = getLocale().language
   return COPY[lang] || COPY[lang.split('-')[0]] || COPY.en
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
