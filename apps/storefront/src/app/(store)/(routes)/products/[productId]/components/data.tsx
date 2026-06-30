import { ContactForm } from '@/components/feedback/ContactForm'
import { Separator } from '@/components/native/separator'
import { PriceTiersTable } from '@/components/native/PriceTiers'
import { WholesaleContact } from '@/components/native/WholesaleContact'
import { getFeedbackCopy } from '@/lib/feedback-copy'
import { getMessages } from '@/i18n'
import { isFeatureEnabled } from '@/lib/features'
import { getTheme } from '@/lib/theme'
import { Badge } from '@/components/ui/badge'
import { formatSoldCount } from '@/lib/locale'
import { parseProductMetadata } from '@/lib/product-metadata'
import type { ProductWithIncludes } from '@/types/prisma'
import Link from 'next/link'

import CartButton from './cart_button'
import WishlistButton from './wishlist_button'

export const DataSection = async ({
   product,
   soldCount = 0,
}: {
   product: ProductWithIncludes
   soldCount?: number
}) => {
   const metadata = parseProductMetadata(product.metadata)
   const common = getMessages().common
   function Price() {
      if (product?.discount > 0) {
         const price = product?.price - product?.discount
         const percentage = (product?.discount / product?.price) * 100
         return (
            <div className="flex gap-2 items-center">
               <Badge className="flex gap-4" variant="destructive">
                  <div className="line-through">${product?.price}</div>
                  <div>%{percentage.toFixed(2)}</div>
               </Badge>
               <h2 className="">${price.toFixed(2)}</h2>
            </div>
         )
      }

      return <h2>${product?.price}</h2>
   }

   return (
      <div className="col-span-2 w-full rounded-lg bg-neutral-100 p-6 dark:bg-neutral-900">
         <h3 className="mb-4 text-xl font-medium">{product.title}</h3>
         {soldCount > 0 ? (
            <p className="mb-2 text-sm text-muted-foreground">
               {formatSoldCount(soldCount)}
            </p>
         ) : null}
         <Separator />
         <div className="flex gap-2 mb-2 items-center">
            <p className="text-sm">{common.brand}:</p>
            <Link href={`/products?brand=${product?.brand?.title}`}>
               <Badge variant="outline">{product?.brand?.title}</Badge>
            </Link>
         </div>
         <div className="flex gap-2 items-center">
            <p className="text-sm">{common.categories}:</p>
            {product.categories.map(({ title }, index) => (
               <Link key={index} href={`/products?categories=${title}`}>
                  <Badge variant="outline">{title}</Badge>
               </Link>
            ))}
         </div>
         <Separator />
         <div className="block space-y-3">
            <Price />
            {metadata.priceTiers?.length ? (
               <PriceTiersTable tiers={metadata.priceTiers} moq={metadata.moq} />
            ) : null}
            <div className="flex gap-2">
               <CartButton product={product} />
               <WishlistButton product={product} />
            </div>
            <WholesaleContact />
            {isFeatureEnabled('contactMessages') ? (
               <div className="rounded-md border border-dashed p-4 space-y-3">
                  <p className="text-sm font-medium">{getFeedbackCopy().inquiryTitle}</p>
                  <ContactForm
                     theme={getTheme()}
                     productId={product.id}
                     source="product"
                     defaultSubject={product.title}
                     compact
                  />
               </div>
            ) : null}
         </div>
      </div>
   )
}
