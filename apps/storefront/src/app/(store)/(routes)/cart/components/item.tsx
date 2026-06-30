'use client'

import { Spinner } from '@/components/native/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { getCountInCart, getLocalCart } from '@/lib/cart'
import {
   formatMoqLabel,
   getProductMoq,
   nextAddCount,
   nextRemoveCount,
} from '@/lib/moq'
import { formatMoney } from '@/lib/locale'
import type { StorefrontTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { useCartContext } from '@/state/Cart'
import { MinusIcon, PlusIcon, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const Item = ({
   cartItem,
   theme = 'shop',
}: {
   cartItem: any
   theme?: StorefrontTheme
}) => {
   const { authenticated } = useAuthenticated()
   const { loading, cart, refreshCart, dispatchCart } = useCartContext()
   const [fetchingCart, setFetchingCart] = useState(false)

   const { product, productId, count } = cartItem
   const moq = getProductMoq(product)

   function findLocalCartIndexById(array, productId) {
      for (let i = 0; i < array.length; i++) {
         if (array?.items[i]?.productId === productId) {
            return i
         }
      }
      return -1
   }

   async function getProduct() {
      try {
         const response = await fetch(`/api/products/${productId}`, {
            cache: 'no-store',
         })

         if (!response.ok) return null
         return await response.json()
      } catch (error) {
         console.error({ error })
         return null
      }
   }

   async function onAddToCart() {
      try {
         setFetchingCart(true)

         const count = getCountInCart({ cartItems: cart?.items, productId })
         const moq = getProductMoq(product)
         const newCount = nextAddCount(count, moq)

         if (authenticated) {
            const response = await fetch(`/api/cart`, {
               method: 'POST',
               body: JSON.stringify({
                  productId,
                  count: newCount,
               }),
               cache: 'no-store',
               headers: {
                  'Content-Type': 'application/json',
               },
            })

            if (!response.ok) {
               setFetchingCart(false)
               return
            }

            const json = await response.json()

            dispatchCart(json)
         }

         const localCart = getLocalCart() as any

         if (!authenticated && count > 0) {
            for (let i = 0; i < localCart.items.length; i++) {
               if (localCart.items[i].productId === productId) {
                  localCart.items[i].count = newCount
               }
            }

            dispatchCart(localCart)
         }

         if (!authenticated && count < 1) {
            localCart.items.push({
               productId,
               product: product || (await getProduct()),
               count: moq,
            })

            dispatchCart(localCart)
         }

         setFetchingCart(false)
      } catch (error) {
         console.error({ error })
      }
   }

   async function onRemoveFromCart() {
      try {
         setFetchingCart(true)

         const count = getCountInCart({ cartItems: cart?.items, productId })
         const moq = getProductMoq(product)
         const newCount = nextRemoveCount(count, moq)

         if (authenticated) {
            const response = await fetch(`/api/cart`, {
               method: 'POST',
               body: JSON.stringify({
                  productId,
                  count: newCount,
               }),
               cache: 'no-store',
               headers: {
                  'Content-Type': 'application/json',
               },
            })

            if (!response.ok) {
               setFetchingCart(false)
               return
            }

            const json = await response.json()
            dispatchCart(json)
         }

         const localCart = getLocalCart() as any
         const index = findLocalCartIndexById(localCart, productId)

         if (!authenticated && count > 0) {
            if (newCount <= 0) {
               localCart.items.splice(index, 1)
            } else {
               for (let i = 0; i < localCart.items.length; i++) {
                  if (localCart.items[i].productId === productId) {
                     localCart.items[i].count = newCount
                  }
               }
            }

            dispatchCart(localCart)
         }

         setFetchingCart(false)
      } catch (error) {
         console.error({ error })
      }
   }

   function CartButton() {
      const count = getCountInCart({
         cartItems: cart?.items,
         productId,
      })
      const moq = getProductMoq(product)
      const removeClears = nextRemoveCount(count, moq) === 0

      if (fetchingCart)
         return (
            <Button disabled>
               <Spinner />
            </Button>
         )

      if (count === 0) {
         return <Button onClick={onAddToCart}>🛒 Add to Cart</Button>
      }

      if (count > 0) {
         return (
            <>
               <Button variant="outline" size="icon" onClick={onRemoveFromCart}>
                  {removeClears ? (
                     <X className="h-4" />
                  ) : (
                     <MinusIcon className="h-4" />
                  )}
               </Button>
               <Button disabled variant="ghost" size="icon">
                  {count}
               </Button>
               <Button
                  disabled={productId == ''}
                  variant="outline"
                  size="icon"
                  onClick={onAddToCart}
               >
                  <PlusIcon className="h-4" />
               </Button>
            </>
         )
      }
   }

   function Price() {
      if (product?.discount > 0) {
         const price = product?.price - product?.discount
         const percentage = (product?.discount / product?.price) * 100
         return (
            <div className="flex gap-2 items-center">
               <Badge className="flex gap-4" variant="destructive">
                  <div className="line-through">{formatMoney(product?.price)}</div>
                  <div>%{percentage.toFixed(2)}</div>
               </Badge>
               <p className="font-semibold">{formatMoney(price)}</p>
            </div>
         )
      }

      return <p className="font-semibold">{formatMoney(product?.price)}</p>
   }
   return (
      <Card
         className={cn(
            theme === 'shop' && 'overflow-hidden transition hover:shadow-md',
            theme === 'corporate' && 'border shadow-sm',
            theme === 'blog' && 'border-dashed'
         )}
      >
         <CardHeader className="p-0 md:hidden">
            <div className="relative h-32 w-full">
               <Link href={`/products/${product?.id}`}>
                  <Image
                     className="rounded-t-lg"
                     src={product?.images[0]}
                     alt="product image"
                     fill
                     sizes="(min-width: 1000px) 30vw, 50vw"
                     style={{ objectFit: 'cover' }}
                  />
               </Link>
            </div>
         </CardHeader>
         <CardContent className="grid grid-cols-6 gap-4 p-3">
            <div className="relative w-full col-span-2 hidden md:inline-flex">
               <Link href={`/products/${product?.id}`}>
                  <Image
                     className="rounded-lg"
                     src={product?.images[0]}
                     alt="item image"
                     fill
                     style={{ objectFit: 'cover' }}
                  />
               </Link>
            </div>
            <div className="col-span-4 block space-y-2">
               <Link href={`/products/${product?.id}`}>
                  <h2>{product?.title}</h2>
               </Link>
               <p className="text-xs text-muted-foreground text-justify">
                  {product?.description}
               </p>
               <Price />
               {moq > 1 ? (
                  <p className="text-xs text-muted-foreground">
                     {formatMoqLabel(moq)}
                  </p>
               ) : null}
               <CartButton />
            </div>
         </CardContent>
      </Card>
   )
}
