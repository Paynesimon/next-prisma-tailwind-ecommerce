import { getLocale } from '@/lib/locale'

export type ShopNavCopy = {
   home: string
   products: string
   blog: string
   about: string
   contact: string
   login: string
   shopNow: string
   cart: string
   menu: string
   categories: string
   brands: string
   footerShop: string
   footerSupport: string
   footerLegal: string
   footerFollow: string
   privacy: string
   terms: string
   faq: string
   telegram: string
   rights: (year: number, name: string) => string
}

const COPY: Record<string, ShopNavCopy> = {
   en: {
      home: 'Home',
      products: 'Products',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      shopNow: 'Shop now',
      cart: 'Cart',
      menu: 'Menu',
      categories: 'Categories',
      brands: 'Brands',
      footerShop: 'Shop',
      footerSupport: 'Support',
      footerLegal: 'Legal',
      footerFollow: 'Follow us',
      privacy: 'Privacy',
      terms: 'Terms',
      faq: 'FAQ',
      telegram: 'Telegram',
      rights: (y, n) => `© ${y} ${n}. All rights reserved.`,
   },
   zh: {
      home: '首页',
      products: '全部商品',
      blog: '博客',
      about: '关于',
      contact: '联系',
      login: '登录',
      shopNow: '去逛逛',
      cart: '购物车',
      menu: '菜单',
      categories: '分类',
      brands: '品牌',
      footerShop: '购物',
      footerSupport: '帮助',
      footerLegal: '条款',
      footerFollow: '关注我们',
      privacy: '隐私政策',
      terms: '服务条款',
      faq: '常见问题',
      telegram: 'Telegram',
      rights: (y, n) => `© ${y} ${n} 版权所有`,
   },
   ja: {
      home: 'ホーム',
      products: '商品',
      blog: 'ブログ',
      about: '概要',
      contact: '連絡',
      login: 'ログイン',
      shopNow: 'ショップへ',
      cart: 'カート',
      menu: 'メニュー',
      categories: 'カテゴリー',
      brands: 'ブランド',
      footerShop: 'ショップ',
      footerSupport: 'サポート',
      footerLegal: '法務',
      footerFollow: 'フォロー',
      privacy: 'プライバシー',
      terms: '利用規約',
      faq: 'FAQ',
      telegram: 'Telegram',
      rights: (y, n) => `© ${y} ${n}. All rights reserved.`,
   },
}

export function getShopNavCopy(): ShopNavCopy {
   const lang = getLocale().language
   return COPY[lang] || COPY[lang.split('-')[0]] || COPY.en
}

export const SHOP_NAV_LINKS = [
   { key: 'home' as const, href: '/' },
   { key: 'products' as const, href: '/products' },
   { key: 'blog' as const, href: '/blog' },
   { key: 'about' as const, href: '/about' },
   { key: 'contact' as const, href: '/contact' },
]
