import { getLocale } from '@/lib/locale'

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

const COPY: Record<string, CorporateHomeCopy> = {
   en: {
      contactUs: 'Contact us',
      viewCatalog: 'View catalog',
      learnMore: 'About us',
      metricsTitle: 'At a glance',
      metricProducts: 'Products',
      metricCategories: 'Categories',
      metricPartner: 'Partner',
      aboutTitle: 'Who we are',
      aboutDesc: 'Built on expertise, focused on long-term partnerships.',
      solutionsTitle: 'Solutions & categories',
      solutionsDesc: 'Explore our product lines by industry and use case.',
      explore: 'Explore',
      productsTitle: 'Featured products',
      productsDesc: 'Representative items from our catalog.',
      viewAll: 'View all products',
      insightsTitle: 'Insights',
      insightsDesc: 'News and perspectives from our team.',
      ctaTitle: 'Ready to work together?',
      ctaDesc: 'Tell us about your requirements—we respond within one business day.',
      ctaContact: 'Get in touch',
      ctaCatalog: 'Browse catalog',
      formatCategoryCount: (n) => `${n} products`,
   },
   zh: {
      contactUs: '联系我们',
      viewCatalog: '查看产品目录',
      learnMore: '了解我们',
      metricsTitle: '企业概览',
      metricProducts: '产品',
      metricCategories: '品类',
      metricPartner: '合作品牌',
      aboutTitle: '关于我们',
      aboutDesc: '以专业能力与长期合作为导向，服务全球客户。',
      solutionsTitle: '解决方案与品类',
      solutionsDesc: '按行业与应用场景浏览产品线。',
      explore: '了解详情',
      productsTitle: '代表产品',
      productsDesc: '目录中的精选与热销型号。',
      viewAll: '查看全部产品',
      insightsTitle: '洞察与动态',
      insightsDesc: '来自团队的分享与行业观察。',
      ctaTitle: '期待与您合作',
      ctaDesc: '欢迎告知您的需求，我们将在一个工作日内回复。',
      ctaContact: '立即联系',
      ctaCatalog: '浏览产品目录',
      formatCategoryCount: (n) => `${n} 款产品`,
   },
   ja: {
      contactUs: 'お問い合わせ',
      viewCatalog: 'カタログを見る',
      learnMore: '会社概要',
      metricsTitle: '概要',
      metricProducts: '製品',
      metricCategories: 'カテゴリー',
      metricPartner: 'パートナー',
      aboutTitle: '私たちについて',
      aboutDesc: '専門性と長期的なパートナーシップを重視しています。',
      solutionsTitle: 'ソリューション',
      solutionsDesc: '業界・用途別に製品ラインをご覧ください。',
      explore: '詳しく見る',
      productsTitle: '注目製品',
      productsDesc: 'カタログの代表的なアイテム。',
      viewAll: 'すべての製品',
      insightsTitle: 'インサイト',
      insightsDesc: 'チームからの最新情報。',
      ctaTitle: 'ご相談ください',
      ctaDesc: 'ご要件をお聞かせください。1営業日以内にご返信します。',
      ctaContact: 'お問い合わせ',
      ctaCatalog: 'カタログ',
      formatCategoryCount: (n) => `${n} 点`,
   },
}

export function getCorporateHomeCopy(): CorporateHomeCopy {
   const lang = getLocale().language
   return COPY[lang] || COPY[lang.split('-')[0]] || COPY.en
}
