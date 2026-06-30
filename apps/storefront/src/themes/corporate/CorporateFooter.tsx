import { Separator } from '@/components/native/separator'
import { config } from '@/lib/config'
import {
   FacebookIcon,
   InstagramIcon,
   LinkedinIcon,
   Mail,
   MessageCircle,
   TwitterIcon,
} from 'lucide-react'
import Link from 'next/link'

import { getCorporateNavCopy } from './nav-copy'
import { FooterNewsletter } from './FooterNewsletter'

const SHELL_X =
   'px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]'

function excerpt(text: string, max = 160) {
   const clean = text.replace(/\s+/g, ' ').trim()
   if (clean.length <= max) return clean
   return `${clean.slice(0, max).trim()}…`
}

export function CorporateFooter() {
   const copy = getCorporateNavCopy()
   const year = new Date().getFullYear()
   const {
      contactEmail,
      whatsappLink,
      telegramLink,
      instagramLink,
      twitterLink,
      facebookLink,
      linkedinLink,
      tiktokLink,
   } = config.store

   const socials = [
      { url: linkedinLink, icon: LinkedinIcon, label: 'LinkedIn' },
      { url: instagramLink, icon: InstagramIcon, label: 'Instagram' },
      { url: twitterLink, icon: TwitterIcon, label: 'Twitter' },
      { url: facebookLink, icon: FacebookIcon, label: 'Facebook' },
      { url: tiktokLink, label: 'TikTok', text: 'TT' },
      { url: telegramLink, label: copy.telegram, text: 'TG' },
   ].filter((s) => s.url?.trim())

   return (
      <footer className="mt-16 border-t bg-foreground text-background">
         <div className={SHELL_X}>
            <div className="border-b border-background/15 py-10 md:py-12">
               <FooterNewsletter className="mx-auto max-w-xl md:max-w-2xl" />
            </div>

            <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
               <div className="space-y-4 lg:col-span-4">
                  <p className="text-lg font-semibold tracking-tight">
                     {config.store.name}
                  </p>
                  <p className="text-sm leading-relaxed text-background/70">
                     {excerpt(
                        config.store.description || copy.footerTagline,
                        200
                     )}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                     {contactEmail ? (
                        <a
                           href={`mailto:${contactEmail}`}
                           className="inline-flex items-center gap-1.5 text-sm text-background/80 transition hover:text-background"
                        >
                           <Mail className="h-4 w-4" />
                           {contactEmail}
                        </a>
                     ) : null}
                     {whatsappLink ? (
                        <a
                           href={whatsappLink}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center gap-1.5 text-sm text-background/80 transition hover:text-background"
                        >
                           <MessageCircle className="h-4 w-4" />
                           WhatsApp
                        </a>
                     ) : null}
                  </div>
               </div>

               <FooterColumn
                  className="lg:col-span-2"
                  title={copy.footerCompany}
                  links={[
                     { label: copy.about, href: '/about' },
                     { label: copy.contact, href: '/contact' },
                     { label: copy.faq, href: '/faq' },
                  ]}
               />
               <FooterColumn
                  className="lg:col-span-2"
                  title={copy.footerCatalog}
                  links={[
                     { label: copy.products, href: '/products' },
                     { label: copy.blog, href: '/blog' },
                  ]}
               />
               <FooterColumn
                  className="lg:col-span-2"
                  title={copy.footerLegal}
                  links={[
                     { label: copy.privacy, href: '/privacy' },
                     { label: copy.terms, href: '/terms' },
                  ]}
               />
               <div className="space-y-3 lg:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-background/60">
                     {copy.footerConnect}
                  </p>
                  {socials.length ? (
                     <div className="flex flex-wrap gap-3">
                        {socials.map((social) => (
                           <a
                              key={social.label}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 text-background/80 transition hover:border-background/40 hover:bg-background/10 hover:text-background"
                              aria-label={social.label}
                           >
                              {'icon' in social && social.icon ? (
                                 <social.icon className="h-4 w-4" />
                              ) : (
                                 <span className="text-[10px] font-bold">
                                    {social.text}
                                 </span>
                              )}
                           </a>
                        ))}
                     </div>
                  ) : (
                     <Link
                        href="/contact"
                        className="text-sm text-background/80 hover:text-background"
                     >
                        {copy.contactCta}
                     </Link>
                  )}
               </div>
            </div>

            <Separator className="bg-background/15" />
            <div className="flex flex-col gap-3 py-6 text-xs text-background/60 sm:flex-row sm:items-center sm:justify-between">
               <p>{copy.rights(year, config.store.name)}</p>
               <p className="text-background/50">{config.store.creator}</p>
            </div>
         </div>
      </footer>
   )
}

function FooterColumn({
   title,
   links,
   className,
}: {
   title: string
   links: { label: string; href: string }[]
   className?: string
}) {
   return (
      <div className={className}>
         <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-background/60">
            {title}
         </p>
         <ul className="space-y-2">
            {links.map((link) => (
               <li key={link.href}>
                  <Link
                     href={link.href}
                     className="text-sm text-background/75 transition hover:text-background"
                  >
                     {link.label}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   )
}
