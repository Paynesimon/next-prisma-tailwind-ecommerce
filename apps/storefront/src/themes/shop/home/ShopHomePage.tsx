import {
   BlogPostGrid,
   BlogPostSkeletonGrid,
} from '@/components/native/BlogCard'
import { ProductGrid, ProductSkeletonGrid } from '@/components/native/Product'
import type { ProductWithIncludes } from '@/types/prisma'
import { isVariableValid } from '@/lib/utils'

import { BrandStorySection } from './BrandStorySection'
import { CategorySection } from './CategorySection'
import { getHomeCopy } from './copy'
import { HeroSection } from './HeroSection'
import { HomeSection } from './HomeSection'
import { TrustBar } from './TrustBar'

import type { CategoryCardData } from '@/lib/category-cover'
import type { ProductRatingSummary } from '@/lib/product-ratings'

type Props = {
   storeName: string
   tagline: string
   bannerImages: string[]
   products: ProductWithIncludes[]
   soldCounts: Record<string, number>
   ratingSummaries?: Record<string, ProductRatingSummary>
   categories: CategoryCardData[]
   blogs: any[]
}

function pickFeaturedProducts(products: ProductWithIncludes[]) {
   const featured = products.filter((p) => p.isFeatured)
   if (featured.length >= 4) return featured.slice(0, 8)
   return products.slice(0, 8)
}

export function ShopHomePage({
   storeName,
   tagline,
   bannerImages,
   products,
   soldCounts,
   ratingSummaries = {},
   categories,
   blogs,
}: Props) {
   const copy = getHomeCopy()
   const featured = pickFeaturedProducts(products)

   return (
      <div className="flex flex-col gap-12 pb-4 md:gap-16">
         <HeroSection
            images={bannerImages}
            title={storeName}
            tagline={tagline}
            shopNowLabel={copy.shopNow}
            learnMoreLabel={copy.learnMore}
         />

         <TrustBar />

         <CategorySection categories={categories} />

         <HomeSection
            title={copy.featuredTitle}
            description={copy.featuredDesc}
            actionHref="/products"
            actionLabel={copy.viewAll}
         >
            {isVariableValid(featured) ? (
               <ProductGrid
                  products={featured}
                  soldCounts={soldCounts}
                  ratingSummaries={ratingSummaries}
               />
            ) : (
               <ProductSkeletonGrid />
            )}
         </HomeSection>

         <BrandStorySection />

         {blogs?.length ? (
            <HomeSection
               title={copy.blogTitle}
               description={copy.blogDesc}
               actionHref="/blog"
               actionLabel={copy.viewAll}
            >
               {isVariableValid(blogs) ? (
                  <BlogPostGrid blogs={blogs} />
               ) : (
                  <BlogPostSkeletonGrid />
               )}
            </HomeSection>
         ) : null}
      </div>
   )
}
