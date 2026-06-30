import { getMessages, t } from '@/i18n'

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

export function getCorporateNavCopy(): CorporateNavCopy {
   const m = getMessages()
   const c = m.common
   const n = m.corporate.nav

   return {
      home: c.home,
      about: c.about,
      products: c.products,
      blog: n.blog,
      contact: c.contact,
      login: c.login,
      contactCta: n.contactCta,
      menu: n.menu,
      footerTagline: n.footerTagline,
      footerCompany: n.footerCompany,
      footerCatalog: n.footerCatalog,
      footerConnect: n.footerConnect,
      footerLegal: n.footerLegal,
      privacy: n.privacy,
      terms: n.terms,
      faq: n.faq,
      telegram: n.telegram,
      rights: (year, name) => t('common.rights', { year, name }),
      newsletterTitle: n.newsletterTitle,
      newsletterDesc: n.newsletterDesc,
      newsletterPlaceholder: n.newsletterPlaceholder,
      newsletterSubmit: n.newsletterSubmit,
      newsletterSuccess: n.newsletterSuccess,
      newsletterError: n.newsletterError,
   }
}

export const CORPORATE_NAV_LINKS = [
   { key: 'home' as const, href: '/' },
   { key: 'about' as const, href: '/about' },
   { key: 'products' as const, href: '/products' },
   { key: 'blog' as const, href: '/blog' },
   { key: 'contact' as const, href: '/contact' },
]
