import {
   BlogPostGrid,
   BlogPostSkeletonGrid,
} from '@/components/native/BlogCard'
import { ProductGrid, ProductSkeletonGrid } from '@/components/native/Product'
import type { CategoryCardData } from '@/lib/category-cover'
import type { ProductRatingSummary } from '@/lib/product-ratings'
import type { ProductWithIncludes } from '@/types/prisma'
import { isVariableValid } from '@/lib/utils'

import { HomeSection } from '@/themes/shop/home/HomeSection'

import { AboutSection } from './AboutSection'
import { ContactCTA } from './ContactCTA'
import { CorporateHero } from './CorporateHero'
import { getCorporateHomeCopy } from './copy'
import { MetricsStrip } from './MetricsStrip'
import { SolutionsSection } from './SolutionsSection'

type Props = {
   storeName: string
   tagline: string
   description: string
   brandStory: string
   creator: string
   heroImage?: string
   products: ProductWithIncludes[]
   soldCounts: Record<string, number>
   ratingSummaries?: Record<string, ProductRatingSummary>
   categories: CategoryCardData[]
   blogs: any[]
}

function pickFeaturedProducts(products: ProductWithIncludes[]) {
   const featured = products.filter((p) => p.isFeatured)
   if (featured.length >= 2) return featured.slice(0, 4)
   return products.slice(0, 4)
}

export function CorporateHomePage({
   storeName,
   tagline,
   description,
   brandStory,
   creator,
   heroImage,
   products,
   soldCounts,
   ratingSummaries = {},
   categories,
   blogs,
}: Props) {
   const copy = getCorporateHomeCopy()
   const featured = pickFeaturedProducts(products)

   return (
      <div className="flex flex-col gap-14 pb-6 md:gap-20">
         <CorporateHero
            storeName={storeName}
            tagline={tagline}
            description={description}
            heroImage={heroImage}
            contactLabel={copy.contactUs}
            catalogLabel={copy.viewCatalog}
         />

         <MetricsStrip
            productCount={products.length}
            categoryCount={categories.length}
            partnerName={creator || storeName}
         />

         <AboutSection storeName={storeName} brandStory={brandStory} />

         <SolutionsSection categories={categories} />

         <HomeSection
            title={copy.productsTitle}
            description={copy.productsDesc}
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

         {blogs?.length ? (
            <HomeSection
               title={copy.insightsTitle}
               description={copy.insightsDesc}
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

         <ContactCTA />
      </div>
   )
}
