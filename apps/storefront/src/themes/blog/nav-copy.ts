import { getMessages, t } from '@/i18n'

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

export function getBlogNavCopy(): BlogNavCopy {
   const m = getMessages()
   const c = m.common
   const n = m.blog.nav

   return {
      home: c.home,
      blog: c.blog,
      products: n.products,
      about: c.about,
      contact: c.contact,
      login: c.login,
      menu: n.menu,
      readMore: n.readMore,
      latestPosts: n.latestPosts,
      featured: n.featured,
      shopPicks: n.shopPicks,
      viewAllPosts: n.viewAllPosts,
      viewCatalog: n.viewCatalog,
      footerExplore: n.footerExplore,
      footerStore: n.footerStore,
      rights: (year, name) => t('blog.nav.rights', { year, name }),
   }
}

export const BLOG_NAV_LINKS = [
   { key: 'home' as const, href: '/' },
   { key: 'blog' as const, href: '/blog' },
   { key: 'products' as const, href: '/products' },
   { key: 'about' as const, href: '/about' },
   { key: 'contact' as const, href: '/contact' },
]
