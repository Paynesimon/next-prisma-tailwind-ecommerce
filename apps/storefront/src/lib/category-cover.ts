type CategoryCoverSource = {
   banners: { image: string }[]
   products: { images: string[] }[]
}

export function resolveCategoryCover(
   category: CategoryCoverSource
): string | null {
   const bannerImage = category.banners.find((b) => b.image)?.image
   if (bannerImage) return bannerImage

   for (const product of category.products) {
      const image = product.images?.find(Boolean)
      if (image) return image
   }

   return null
}

export type CategoryCardData = {
   id: string
   title: string
   description: string | null
   coverImage: string | null
   _count: { products: number }
}

export function toCategoryCards(
   categories: (CategoryCoverSource & {
      id: string
      title: string
      description: string | null
      _count: { products: number }
   })[]
): CategoryCardData[] {
   return categories
      .filter((c) => c._count.products > 0)
      .map((c) => ({
         id: c.id,
         title: c.title,
         description: c.description,
         _count: c._count,
         coverImage: resolveCategoryCover(c),
      }))
}
