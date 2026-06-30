import { getLocale } from '@/lib/locale'

export type BlogNavCopy = {
   home: string
   blog: string
   products: string
   about: string
   contact: string
   login: string
   menu: string
   readMore: string
   latestPosts: string
   featured: string
   shopPicks: string
   viewAllPosts: string
   viewCatalog: string
   footerExplore: string
   footerStore: string
   rights: (year: number, name: string) => string
}

const COPY: Record<string, BlogNavCopy> = {
   en: {
      home: 'Home',
      blog: 'Blog',
      products: 'Shop',
      about: 'About',
      contact: 'Contact',
      login: 'Sign in',
      menu: 'Menu',
      readMore: 'Read article',
      latestPosts: 'Latest stories',
      featured: 'Featured',
      shopPicks: 'From the store',
      viewAllPosts: 'All posts',
      viewCatalog: 'View products',
      footerExplore: 'Explore',
      footerStore: 'Store',
      rights: (y, n) => `© ${y} ${n}`,
   },
   zh: {
      home: '首页',
      blog: '文章',
      products: '商店',
      about: '关于',
      contact: '联系',
      login: '登录',
      menu: '菜单',
      readMore: '阅读全文',
      latestPosts: '最新文章',
      featured: '精选',
      shopPicks: '商店精选',
      viewAllPosts: '全部文章',
      viewCatalog: '查看商品',
      footerExplore: '浏览',
      footerStore: '商店',
      rights: (y, n) => `© ${y} ${n}`,
   },
   ja: {
      home: 'ホーム',
      blog: 'ブログ',
      products: 'ショップ',
      about: '概要',
      contact: '連絡',
      login: 'ログイン',
      menu: 'メニュー',
      readMore: '続きを読む',
      latestPosts: '最新記事',
      featured: '注目',
      shopPicks: 'ストアより',
      viewAllPosts: 'すべての記事',
      viewCatalog: '商品を見る',
      footerExplore: '探索',
      footerStore: 'ストア',
      rights: (y, n) => `© ${y} ${n}`,
   },
}

export function getBlogNavCopy(): BlogNavCopy {
   const lang = getLocale().language
   return COPY[lang] || COPY[lang.split('-')[0]] || COPY.en
}

export const BLOG_NAV_LINKS = [
   { key: 'home' as const, href: '/' },
   { key: 'blog' as const, href: '/blog' },
   { key: 'products' as const, href: '/products' },
   { key: 'about' as const, href: '/about' },
   { key: 'contact' as const, href: '/contact' },
]
