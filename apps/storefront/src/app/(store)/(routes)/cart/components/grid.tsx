'use client'

import { Card, CardContent } from '@/components/ui/card'
import type { StorefrontTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { isVariableValid } from '@/lib/utils'
import { useCartContext } from '@/state/Cart'

import {
   cartGridClass,
   cartItemsColClass,
   getCartCopy,
} from '@/themes/cart/copy'

import { Item } from './item'
import { CartMoqAlerts } from './moq-alerts'
import { Receipt } from './receipt'
import { Skeleton } from './skeleton'

export const CartGrid = ({ theme = 'shop' }: { theme?: StorefrontTheme }) => {
   const { cart } = useCartContext()
   const copy = getCartCopy()

   const empty = (
      <div
         className={cn(
            'mb-4 grid grid-cols-1',
            cartGridClass(theme)
         )}
      >
         <div className={cartItemsColClass(theme)}>
            <Card
               className={cn(
                  theme === 'shop' && 'border-dashed',
                  theme === 'blog' && 'border-dashed bg-muted/20'
               )}
            >
               <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">{copy.empty}</p>
               </CardContent>
            </Card>
         </div>
         <Receipt theme={theme} />
      </div>
   )

   if (isVariableValid(cart?.items) && cart?.items?.length === 0) {
      return empty
   }

   return (
      <div className={cn('mb-4 grid grid-cols-1', cartGridClass(theme))}>
         <div className={cartItemsColClass(theme)}>
            <CartMoqAlerts />
            {isVariableValid(cart?.items)
               ? cart?.items?.map((cartItem, index) => (
                    <Item cartItem={cartItem} key={index} theme={theme} />
                 ))
               : [...Array(5)].map((_, index) => <Skeleton key={index} />)}
         </div>
         <Receipt theme={theme} />
      </div>
   )
}
