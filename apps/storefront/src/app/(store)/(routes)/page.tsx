import {
   BlogPostGrid,
   BlogPostSkeletonGrid,
} from '@/components/native/BlogCard'
import Carousel from '@/components/native/Carousel'
import { ProductGrid, ProductSkeletonGrid } from '@/components/native/Product'
import { Heading } from '@/components/native/heading'
import { Separator } from '@/components/native/separator'
import { toCategoryCards } from '@/lib/category-cover'
import { config } from '@/lib/config'
import prisma from '@/lib/prisma'
import { getSoldCounts } from '@/lib/product-stats'
import { getProductRatingSummaries } from '@/lib/product-ratings'
import { isFeatureEnabled } from '@/lib/features'
import { getTheme } from '@/lib/theme'
import { isVariableValid } from '@/lib/utils'
import { ShopHomePage } from '@/themes/shop/home/ShopHomePage'
import { CorporateHomePage } from '@/themes/corporate/home/CorporateHomePage'
import { BlogHomePage } from '@/themes/blog/home/BlogHomePage'

export default async function Index() {
   const products = await prisma.product.findMany({
      include: {
         brand: true,
         categories: true,
      },
   })

   const soldCounts = await getSoldCounts(products.map((p) => p.id))
   const ratingSummaries = isFeatureEnabled('productReviews')
      ? await getProductRatingSummaries(products.map((p) => p.id))
      : {}

   const blogs = await prisma.blog.findMany({
      include: { author: true },
      take: 8,
      orderBy: { createdAt: 'desc' },
   })

   const categories = await prisma.category.findMany({
      include: {
         _count: { select: { products: true } },
         banners: {
            select: { image: true },
            take: 1,
         },
         products: {
            where: { isAvailable: true },
            orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
            take: 3,
            select: { images: true },
         },
      },
      orderBy: { title: 'asc' },
   })

   const categoryCards = toCategoryCards(categories)

   const dbBanners = await prisma.banner.findMany({
      include: { categories: true },
   })
   const carouselBanners = dbBanners.filter((b) => b.categories.length === 0)
   const bannerImages = isVariableValid(carouselBanners)
      ? carouselBanners.map((obj) => obj.image)
      : config.banners.map((b: { image: string }) => b.image)

   if (getTheme() === 'shop') {
      return (
         <ShopHomePage
            storeName={config.store.name}
            tagline={config.store.tagline}
            bannerImages={bannerImages}
            products={products}
            soldCounts={soldCounts}
            ratingSummaries={ratingSummaries}
            categories={categoryCards}
            blogs={blogs}
         />
      )
   }

   if (getTheme() === 'corporate') {
      return (
         <CorporateHomePage
            storeName={config.store.name}
            tagline={config.store.tagline}
            description={config.store.description}
            brandStory={config.store.brandStory}
            creator={config.store.creator}
            heroImage={bannerImages[0]}
            products={products}
            soldCounts={soldCounts}
            ratingSummaries={ratingSummaries}
            categories={categoryCards}
            blogs={blogs}
         />
      )
   }

   if (getTheme() === 'blog') {
      return (
         <BlogHomePage
            storeName={config.store.name}
            tagline={config.store.tagline}
            blogs={blogs}
            products={products}
            soldCounts={soldCounts}
            ratingSummaries={ratingSummaries}
         />
      )
   }

   return (
      <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
         <Carousel images={bannerImages} />
         <Separator className="my-8" />
         <Heading
            title={config.store.name}
            description={config.store.tagline}
         />
         {isVariableValid(products) ? (
            <ProductGrid
               products={products}
               soldCounts={soldCounts}
               ratingSummaries={ratingSummaries}
            />
         ) : (
            <ProductSkeletonGrid />
         )}
         <Separator className="my-8" />
         {isVariableValid(blogs) ? (
            <BlogPostGrid blogs={blogs} />
         ) : (
            <BlogPostSkeletonGrid />
         )}
      </div>
   )
}
