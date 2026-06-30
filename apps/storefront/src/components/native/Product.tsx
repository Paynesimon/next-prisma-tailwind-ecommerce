import { StarRating } from '@/components/feedback/StarRating'
import { ImageSkeleton } from '@/components/native/icons'
import { Badge } from '@/components/ui/badge'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { formatMoney, formatSoldCount } from '@/lib/locale'
import type { ProductRatingSummary } from '@/lib/product-ratings'
import { ProductWithIncludes } from '@/types/prisma'
import Image from 'next/image'
import Link from 'next/link'

export const ProductGrid = ({
   products,
   soldCounts = {},
   ratingSummaries = {},
}: {
   products: ProductWithIncludes[]
   soldCounts?: Record<string, number>
   ratingSummaries?: Record<string, ProductRatingSummary>
}) => {
   return (
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
         {products.map((product) => (
            <Product
               product={product}
               soldCount={soldCounts[product.id] ?? 0}
               rating={ratingSummaries[product.id]}
               key={product.id}
            />
         ))}
      </div>
   )
}

export const ProductSkeletonGrid = () => {
   return (
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
         {[...Array(12)].map(() => (
            <ProductSkeleton key={Math.random()} />
         ))}
      </div>
   )
}

export const Product = ({
   product,
   soldCount = 0,
   rating,
}: {
   product: ProductWithIncludes
   soldCount?: number
   rating?: ProductRatingSummary
}) => {
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
               <p className="text-lg font-semibold">{formatMoney(price)}</p>
            </div>
         )
      }

      return <p className="text-lg font-semibold">{formatMoney(product?.price)}</p>
   }

   return (
      <Link className="group block h-full" href={`/products/${product.id}`}>
         <Card className="h-full overflow-hidden transition duration-300 hover:border-primary/20 hover:shadow-lg">
            <CardHeader className="p-0">
               <div className="relative h-60 w-full overflow-hidden">
                  <Image
                     className="rounded-t-lg transition duration-500 group-hover:scale-105"
                     src={product?.images[0]}
                     alt={product.title}
                     fill
                     sizes="(min-width: 1000px) 30vw, 50vw"
                     style={{ objectFit: 'cover' }}
                  />
               </div>
            </CardHeader>
            <CardContent className="grid gap-1.5 p-4">
               <Badge variant="outline" className="w-min text-neutral-500">
                  {product?.categories[0]?.title}
               </Badge>

               <h2 className="mt-1 line-clamp-2 text-base font-medium leading-snug group-hover:text-primary">
                  {product.title}
               </h2>
               {rating && rating.count > 0 ? (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                     <StarRating
                        value={Math.round(rating.avg)}
                        readonly
                        size="sm"
                     />
                     <span>
                        {rating.avg.toFixed(1)} ({rating.count})
                     </span>
                  </div>
               ) : null}
               {soldCount > 0 ? (
                  <p className="text-xs text-muted-foreground">
                     {formatSoldCount(soldCount)}
                  </p>
               ) : null}
               <p className="line-clamp-2 text-xs text-neutral-500">
                  {product.description}
               </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
               {product?.isAvailable ? (
                  <Price />
               ) : (
                  <Badge variant="secondary">Out of stock</Badge>
               )}
            </CardFooter>
         </Card>
      </Link>
   )
}

export function ProductSkeleton() {
   return (
      <Link href="#">
         <div className="animate-pulse rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
            <div className="relative h-full w-full">
               <div className="flex h-40 w-full items-center justify-center rounded bg-neutral-300 dark:bg-neutral-700 ">
                  <ImageSkeleton />
               </div>
            </div>
            <div className="p-5">
               <div className="w-full">
                  <div className="mb-4 h-2.5 w-48 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="mb-2.5 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="h-2 max-w-[360px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
               </div>
            </div>
         </div>
      </Link>
   )
}
