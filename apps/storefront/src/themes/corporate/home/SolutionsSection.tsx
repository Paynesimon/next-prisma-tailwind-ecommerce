import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { CategoryCardData } from '@/lib/category-cover'
import { cn } from '@/lib/utils'

import { getCorporateHomeCopy } from './copy'

export function SolutionsSection({
   categories,
}: {
   categories: CategoryCardData[]
}) {
   const copy = getCorporateHomeCopy()

   if (!categories.length) return null

   return (
      <section className="space-y-8">
         <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
               {copy.solutionsTitle}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
               {copy.solutionsDesc}
            </p>
         </div>

         <div className="divide-y rounded-2xl border bg-card">
            {categories.map((category) => (
               <Link
                  key={category.id}
                  href={`/products?category=${encodeURIComponent(category.title)}`}
                  className="group flex items-center gap-4 p-4 transition hover:bg-muted/50 md:gap-6 md:p-6"
               >
                  <div
                     className={cn(
                        'relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-muted md:h-20 md:w-20',
                        !category.coverImage && 'bg-gradient-to-br from-primary/15 to-muted'
                     )}
                  >
                     {category.coverImage ? (
                        <Image
                           src={category.coverImage}
                           alt={category.title}
                           fill
                           className="object-cover"
                           sizes="80px"
                        />
                     ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                     <p className="font-medium group-hover:text-primary">
                        {category.title}
                     </p>
                     {category._count.products ? (
                        <p className="text-sm text-muted-foreground">
                           {copy.formatCategoryCount(category._count.products)}
                        </p>
                     ) : null}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary">
                     {copy.explore}
                     <ArrowUpRight className="h-4 w-4" />
                  </span>
               </Link>
            ))}
         </div>
      </section>
   )
}
