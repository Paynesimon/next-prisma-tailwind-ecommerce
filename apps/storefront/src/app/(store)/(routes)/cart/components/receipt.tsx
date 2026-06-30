'use client'

import { Separator } from '@/components/native/separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { formatMoney, getTaxRate } from '@/lib/locale'
import { getCartMoqIssues } from '@/lib/moq'
import type { StorefrontTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { isVariableValid } from '@/lib/utils'
import { useCartContext } from '@/state/Cart'
import { useState } from 'react'

import { getCartCopy, receiptCardClass } from '@/themes/cart/copy'

export function Receipt({ theme = 'shop' }: { theme?: StorefrontTheme }) {
   const copy = getCartCopy()
   const { authenticated } = useAuthenticated()
   const { loading, cart } = useCartContext()
   const [checkoutLoading, setCheckoutLoading] = useState(false)
   const [error, setError] = useState('')

   function calculatePayableCost() {
      let totalAmount = 0,
         discountAmount = 0

      if (isVariableValid(cart?.items)) {
         for (const item of cart?.items) {
            totalAmount += item?.count * item?.product?.price
            discountAmount += item?.count * item?.product?.discount
         }
      }

      const afterDiscountAmount = totalAmount - discountAmount
      const taxAmount = afterDiscountAmount * getTaxRate()
      const payableAmount = afterDiscountAmount + taxAmount

      return {
         totalAmount: formatMoney(totalAmount),
         discountAmount: formatMoney(discountAmount),
         taxAmount: formatMoney(taxAmount),
         payableAmount: formatMoney(payableAmount),
      }
   }

   async function handleCheckout() {
      if (!authenticated) {
         window.location.href = '/login'
         return
      }

      try {
         setCheckoutLoading(true)
         setError('')

         const items = cart?.items?.map((item: any) => ({
            title: item?.product?.title,
            price: item?.product?.price,
            quantity: item?.count,
            images: item?.product?.images || [],
            description: item?.product?.description || '',
         }))

         const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items }),
         })

         const data = await response.json()

         if (!response.ok) {
            setError(data.error || 'Checkout failed')
            return
         }

         if (data.url) {
            window.location.href = data.url
         }
      } catch {
         setError('Network error')
      } finally {
         setCheckoutLoading(false)
      }
   }

   const cartEmpty = !isVariableValid(cart?.items) || cart?.items?.length === 0
   const moqIssues = getCartMoqIssues(cart?.items || [])
   const costs = calculatePayableCost()

   return (
      <Card
         className={cn(
            loading ? 'animate-pulse' : '',
            receiptCardClass(theme),
            theme === 'blog' && 'mt-6'
         )}
      >
         <CardHeader className="p-4 pb-0">
            <h2
               className={cn(
                  'font-bold tracking-tight',
                  theme === 'blog' && 'font-serif text-xl',
                  theme === 'corporate' && 'text-lg font-semibold'
               )}
            >
               {copy.receipt}
            </h2>
         </CardHeader>
         <CardContent className="p-4 text-sm">
            <div className="space-y-2">
               <div className="flex justify-between">
                  <p>{copy.total}</p>
                  <p className="font-medium">{costs.totalAmount}</p>
               </div>
               <div className="flex justify-between">
                  <p>{copy.discount}</p>
                  <p className="font-medium">{costs.discountAmount}</p>
               </div>
               <div className="flex justify-between">
                  <p>{copy.tax}</p>
                  <p className="font-medium">{costs.taxAmount}</p>
               </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between text-base">
               <p className="font-medium">{copy.payable}</p>
               <p className="font-semibold">{costs.payableAmount}</p>
            </div>
            {theme === 'corporate' && copy.trustNote ? (
               <p className="mt-3 text-xs text-muted-foreground">{copy.trustNote}</p>
            ) : null}
            {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
         </CardContent>
         <Separator />
         <CardFooter className="p-4">
            <Button
               disabled={cartEmpty || checkoutLoading || moqIssues.length > 0}
               className="w-full"
               variant={theme === 'blog' ? 'outline' : 'default'}
               onClick={handleCheckout}
            >
               {checkoutLoading ? copy.checkoutLoading : copy.checkout}
            </Button>
         </CardFooter>
      </Card>
   )
}
