import { getMessages, t } from '@/i18n'

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

export function getShopNavCopy(): ShopNavCopy {
   const m = getMessages()
   const c = m.common
   const n = m.shop.nav

   return {
      home: c.home,
      products: c.products,
      blog: c.blog,
      about: c.about,
      contact: c.contact,
      login: c.login,
      shopNow: n.shopNow,
      cart: c.cart,
      menu: n.menu,
      categories: n.categories,
      brands: n.brands,
      footerShop: n.footerShop,
      footerSupport: n.footerSupport,
      footerLegal: n.footerLegal,
      footerFollow: n.footerFollow,
      privacy: n.privacy,
      terms: n.terms,
      faq: n.faq,
      telegram: n.telegram,
      rights: (year, name) => t('common.rights', { year, name }),
   }
}

export const SHOP_NAV_LINKS = [
   { key: 'home' as const, href: '/' },
   { key: 'products' as const, href: '/products' },
   { key: 'blog' as const, href: '/blog' },
   { key: 'about' as const, href: '/about' },
   { key: 'contact' as const, href: '/contact' },
]
