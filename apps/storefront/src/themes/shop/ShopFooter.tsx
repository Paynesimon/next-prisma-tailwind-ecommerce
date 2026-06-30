import { Separator } from '@/components/native/separator'
import { config } from '@/lib/config'
import {
   FacebookIcon,
   InstagramIcon,
   LinkedinIcon,
   TwitterIcon,
} from 'lucide-react'
import Link from 'next/link'

import { SHELL_X } from '@/themes/shared/theme-styles'

import { getShopNavCopy } from './nav-copy'

export function ShopFooter() {
   const copy = getShopNavCopy()
   const year = new Date().getFullYear()
   const store = config.store

   const socials = [
      { url: store.instagramLink, icon: InstagramIcon },
      { url: store.twitterLink, icon: TwitterIcon },
      { url: store.facebookLink, icon: FacebookIcon },
      { url: store.linkedinLink, icon: LinkedinIcon },
   ].filter((s) => s.url?.trim())

   return (
      <footer className="mt-12 border-t bg-muted/30">
         <div className={SHELL_X}>
            <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
               <div className="space-y-3 lg:col-span-1">
                  <p className="text-lg font-bold text-primary">{store.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                     {store.tagline || store.description}
                  </p>
               </div>
               <FooterCol
                  title={copy.footerShop}
                  links={[
                     { label: copy.products, href: '/products' },
                     { label: copy.blog, href: '/blog' },
                     { label: copy.about, href: '/about' },
                  ]}
               />
               <FooterCol
                  title={copy.footerSupport}
                  links={[
                     { label: copy.contact, href: '/contact' },
                     { label: copy.faq, href: '/faq' },
                     { label: copy.telegram, href: '/telegram' },
                  ]}
               />
               <FooterCol
                  title={copy.footerLegal}
                  links={[
                     { label: copy.privacy, href: '/privacy' },
                     { label: copy.terms, href: '/terms' },
                  ]}
               />
            </div>
            {socials.length ? (
               <>
                  <Separator />
                  <div className="flex flex-wrap items-center justify-between gap-4 py-6">
                     <p className="text-xs text-muted-foreground">
                        {copy.rights(year, store.name)}
                     </p>
                     <div className="flex gap-4 text-muted-foreground">
                        {socials.map(({ url, icon: Icon }, i) => (
                           <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-primary"
                           >
                              <Icon className="h-4 w-4" />
                           </a>
                        ))}
                     </div>
                  </div>
               </>
            ) : (
               <p className="pb-6 text-xs text-muted-foreground">
                  {copy.rights(year, store.name)}
               </p>
            )}
         </div>
      </footer>
   )
}

function FooterCol({
   title,
   links,
}: {
   title: string
   links: { label: string; href: string }[]
}) {
   return (
      <div>
         <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
         </p>
         <ul className="space-y-2">
            {links.map((link) => (
               <li key={link.href}>
                  <Link
                     href={link.href}
                     className="text-sm text-foreground/80 hover:text-primary"
                  >
                     {link.label}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   )
}
