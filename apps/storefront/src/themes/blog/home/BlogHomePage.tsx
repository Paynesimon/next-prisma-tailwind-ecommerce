import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { BlogPostGrid } from '@/components/native/BlogCard'
import { ProductGrid } from '@/components/native/Product'
import type { ProductWithIncludes } from '@/types/prisma'
import type { ProductRatingSummary } from '@/lib/product-ratings'
import { isVariableValid } from '@/lib/utils'

import { getBlogNavCopy } from '../nav-copy'

type BlogPost = {
   slug: string
   title: string
   description: string
   image: string
   createdAt: Date
   author?: { name?: string | null }
}

type Props = {
   storeName: string
   tagline: string
   blogs: BlogPost[]
   products: ProductWithIncludes[]
   soldCounts: Record<string, number>
   ratingSummaries?: Record<string, ProductRatingSummary>
}

export function BlogHomePage({
   storeName,
   tagline,
   blogs,
   products,
   soldCounts,
   ratingSummaries = {},
}: Props) {
   const copy = getBlogNavCopy()
   const featured = blogs[0]
   const rest = blogs.slice(1, 7)
   const picks = products.slice(0, 4)

   return (
      <div className="flex flex-col gap-14 pb-4 md:gap-20">
         <section className="space-y-4 border-b pb-10 md:pb-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
               {storeName}
            </p>
            <h1 className="max-w-3xl font-serif text-3xl font-bold leading-tight tracking-tight md:text-5xl">
               {tagline}
            </h1>
         </section>

         {featured ? (
            <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
               <Link
                  href={`/blog/${featured.slug}`}
                  className="group relative aspect-[16/10] overflow-hidden rounded-xl bg-muted"
               >
                  {featured.image ? (
                     <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority
                     />
                  ) : null}
               </Link>
               <div className="space-y-4">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                     {copy.featured}
                  </p>
                  <h2 className="font-serif text-2xl font-bold leading-snug md:text-3xl">
                     <Link
                        href={`/blog/${featured.slug}`}
                        className="hover:underline"
                     >
                        {featured.title}
                     </Link>
                  </h2>
                  <p className="text-muted-foreground line-clamp-4">
                     {featured.description}
                  </p>
                  {featured.author?.name ? (
                     <p className="text-sm text-muted-foreground">
                        {featured.author.name}
                     </p>
                  ) : null}
                  <Button asChild variant="outline" className="gap-2">
                     <Link href={`/blog/${featured.slug}`}>
                        {copy.readMore}
                        <ArrowRight className="h-4 w-4" />
                     </Link>
                  </Button>
               </div>
            </section>
         ) : null}

         {rest.length ? (
            <section className="space-y-6">
               <div className="flex items-end justify-between gap-4">
                  <h2 className="font-serif text-2xl font-bold md:text-3xl">
                     {copy.latestPosts}
                  </h2>
                  <Link
                     href="/blog"
                     className="text-sm text-muted-foreground hover:text-foreground"
                  >
                     {copy.viewAllPosts} →
                  </Link>
               </div>
               <BlogPostGrid blogs={rest} />
            </section>
         ) : null}

         {isVariableValid(picks) ? (
            <section className="space-y-6 border-t pt-10">
               <div className="flex items-end justify-between gap-4">
                  <h2 className="font-serif text-2xl font-bold md:text-3xl">
                     {copy.shopPicks}
                  </h2>
                  <Link
                     href="/products"
                     className="text-sm text-muted-foreground hover:text-foreground"
                  >
                     {copy.viewCatalog} →
                  </Link>
               </div>
               <ProductGrid
                  products={picks}
                  soldCounts={soldCounts}
                  ratingSummaries={ratingSummaries}
               />
            </section>
         ) : null}
      </div>
   )
}
