import { getLocale } from '@/lib/locale'

export type CorporateNavCopy = {
   home: string
   about: string
   products: string
   blog: string
   contact: string
   login: string
   contactCta: string
   menu: string
   footerTagline: string
   footerCompany: string
   footerCatalog: string
   footerConnect: string
   footerLegal: string
   privacy: string
   terms: string
   faq: string
   telegram: string
   rights: (year: number, name: string) => string
   newsletterTitle: string
   newsletterDesc: string
   newsletterPlaceholder: string
   newsletterSubmit: string
   newsletterSuccess: string
   newsletterError: string
}

const COPY: Record<string, CorporateNavCopy> = {
   en: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      blog: 'Insights',
      contact: 'Contact',
      login: 'Sign in',
      contactCta: 'Get in touch',
      menu: 'Menu',
      footerTagline: 'Professional solutions for global partners.',
      footerCompany: 'Company',
      footerCatalog: 'Catalog',
      footerConnect: 'Connect',
      footerLegal: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      faq: 'FAQ',
      telegram: 'Telegram',
      rights: (year, name) => `© ${year} ${name}. All rights reserved.`,
      newsletterTitle: 'Stay updated',
      newsletterDesc: 'Product news and insights — no spam.',
      newsletterPlaceholder: 'your@email.com',
      newsletterSubmit: 'Subscribe',
      newsletterSuccess: 'Thanks — you are subscribed.',
      newsletterError: 'Something went wrong. Please try again.',
   },
   zh: {
      home: '首页',
      about: '关于我们',
      products: '产品目录',
      blog: '洞察',
      contact: '联系我们',
      login: '登录',
      contactCta: '立即咨询',
      menu: '菜单',
      footerTagline: '面向全球客户的专业产品与解决方案。',
      footerCompany: '公司',
      footerCatalog: '产品',
      footerConnect: '联系方式',
      footerLegal: '法律',
      privacy: '隐私政策',
      terms: '服务条款',
      faq: '常见问题',
      telegram: 'Telegram',
      rights: (year, name) => `© ${year} ${name} 版权所有`,
      newsletterTitle: '订阅动态',
      newsletterDesc: '获取产品资讯与行业洞察，不发送垃圾邮件。',
      newsletterPlaceholder: 'your@email.com',
      newsletterSubmit: '订阅',
      newsletterSuccess: '订阅成功，感谢关注。',
      newsletterError: '提交失败，请稍后重试。',
   },
   ja: {
      home: 'ホーム',
      about: '会社概要',
      products: '製品',
      blog: 'インサイト',
      contact: 'お問い合わせ',
      login: 'ログイン',
      contactCta: 'お問い合わせ',
      menu: 'メニュー',
      footerTagline: 'グローバルパートナー向けのソリューション。',
      footerCompany: '会社',
      footerCatalog: 'カタログ',
      footerConnect: '連絡先',
      footerLegal: '法務',
      privacy: 'プライバシー',
      terms: '利用規約',
      faq: 'FAQ',
      telegram: 'Telegram',
      rights: (year, name) => `© ${year} ${name}. All rights reserved.`,
      newsletterTitle: '最新情報を受け取る',
      newsletterDesc: '製品ニュースとインサイトをお届けします。',
      newsletterPlaceholder: 'your@email.com',
      newsletterSubmit: '登録',
      newsletterSuccess: 'ご登録ありがとうございます。',
      newsletterError: 'エラーが発生しました。もう一度お試しください。',
   },
}

export function getCorporateNavCopy(): CorporateNavCopy {
   const lang = getLocale().language
   return COPY[lang] || COPY[lang.split('-')[0]] || COPY.en
}

export const CORPORATE_NAV_LINKS = [
   { key: 'home' as const, href: '/' },
   { key: 'about' as const, href: '/about' },
   { key: 'products' as const, href: '/products' },
   { key: 'blog' as const, href: '/blog' },
   { key: 'contact' as const, href: '/contact' },
]
