import Image from 'next/image'
import Link from 'next/link'

import type { CategoryCardData } from '@/lib/category-cover'
import { cn } from '@/lib/utils'

import { getHomeCopy } from './copy'
import { HomeSection } from './HomeSection'

export function CategorySection({ categories }: { categories: CategoryCardData[] }) {
   const copy = getHomeCopy()

   if (!categories.length) return null

   return (
      <HomeSection
         title={copy.categoriesTitle}
         description={copy.categoriesDesc}
         actionHref="/products"
         actionLabel={copy.viewAll}
      >
         <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
               <Link
                  key={category.id}
                  href={`/products?category=${encodeURIComponent(category.title)}`}
                  className="group relative overflow-hidden rounded-xl border bg-card transition hover:border-primary/30 hover:shadow-md"
               >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                     {category.coverImage ? (
                        <Image
                           src={category.coverImage}
                           alt={category.title}
                           fill
                           sizes="(min-width: 1024px) 25vw, 50vw"
                           className="object-cover transition duration-500 group-hover:scale-105"
                        />
                     ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/10 to-muted" />
                     )}
                     <div
                        className={cn(
                           'absolute inset-0',
                           category.coverImage
                              ? 'bg-gradient-to-t from-black/75 via-black/25 to-black/10'
                              : 'bg-gradient-to-br from-primary/20 via-primary/5 to-transparent'
                        )}
                     />
                     <div className="absolute inset-0 flex items-end p-4">
                        <div
                           className={cn(
                              category.coverImage ? 'text-white' : 'text-foreground'
                           )}
                        >
                           <p
                              className={cn(
                                 'font-medium',
                                 category.coverImage
                                    ? 'group-hover:text-white/90'
                                    : 'group-hover:text-primary'
                              )}
                           >
                              {category.title}
                           </p>
                           {category._count.products ? (
                              <p
                                 className={cn(
                                    'text-xs',
                                    category.coverImage
                                       ? 'text-white/75'
                                       : 'text-muted-foreground'
                                 )}
                              >
                                 {copy.formatCategoryCount(category._count.products)}
                              </p>
                           ) : null}
                        </div>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </HomeSection>
   )
}
