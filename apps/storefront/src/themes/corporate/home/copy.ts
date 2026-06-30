import { getMessages, t } from '@/i18n'

export type CorporateHomeCopy = {
   contactUs: string
   viewCatalog: string
   learnMore: string
   metricsTitle: string
   metricProducts: string
   metricCategories: string
   metricPartner: string
   aboutTitle: string
   aboutDesc: string
   solutionsTitle: string
   solutionsDesc: string
   explore: string
   productsTitle: string
   productsDesc: string
   viewAll: string
   insightsTitle: string
   insightsDesc: string
   ctaTitle: string
   ctaDesc: string
   ctaContact: string
   ctaCatalog: string
   formatCategoryCount: (count: number) => string
}

export function getCorporateHomeCopy(): CorporateHomeCopy {
   const h = getMessages().corporate.home

   return {
      ...h,
      formatCategoryCount: (count) => t('common.categoryCount', { count }),
   }
}
