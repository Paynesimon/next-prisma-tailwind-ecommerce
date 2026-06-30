import { getMessages, t } from '@/i18n'

type HomeCopy = {
   shopNow: string
   learnMore: string
   viewAll: string
   featuredTitle: string
   featuredDesc: string
   categoriesTitle: string
   categoriesDesc: string
   brandTitle: string
   readStory: string
   blogTitle: string
   blogDesc: string
   formatCategoryCount: (count: number) => string
   trust: { title: string; items: { title: string; desc: string }[] }
}

export function getHomeCopy(): HomeCopy {
   const h = getMessages().shop.home

   return {
      shopNow: h.shopNow,
      learnMore: h.learnMore,
      viewAll: h.viewAll,
      featuredTitle: h.featuredTitle,
      featuredDesc: h.featuredDesc,
      categoriesTitle: h.categoriesTitle,
      categoriesDesc: h.categoriesDesc,
      brandTitle: h.brandTitle,
      readStory: h.readStory,
      blogTitle: h.blogTitle,
      blogDesc: h.blogDesc,
      formatCategoryCount: (count) => t('common.categoryCount', { count }),
      trust: h.trust,
   }
}
