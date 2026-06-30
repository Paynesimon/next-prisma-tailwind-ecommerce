'use client'

import { CommandMenu } from '@/components/composites/command'
import { UserNav } from '@/components/native/nav/user'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { config } from '@/lib/config'
import { cn } from '@/lib/utils'
import {
   LogInIcon,
   Mail,
   Menu,
   MoonIcon,
   ShoppingBasketIcon,
   SunIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import {
   CORPORATE_NAV_LINKS,
   getCorporateNavCopy,
} from './nav-copy'
import { CorporateMobileNavLink, CorporateNavLink } from './CorporateNavLink'

const SHELL_X =
   'px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]'

function truncate(text: string, max = 48) {
   const clean = text.trim()
   if (clean.length <= max) return clean
   return `${clean.slice(0, max).trim()}…`
}

export function CorporateHeader() {
   const copy = getCorporateNavCopy()
   const pathname = usePathname()
   const { authenticated } = useAuthenticated()
   const email = config.store.contactEmail?.trim()

   return (
      <header className="sticky top-0 z-50 mb-0 border-b border-border/70 bg-background/95 shadow-sm backdrop-blur-md">
         {email ? (
            <div
               className={cn(
                  'hidden border-b border-border/50 bg-muted/30 md:block',
                  SHELL_X
               )}
            >
               <div className="flex h-8 items-center justify-end gap-1 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <a
                     href={`mailto:${email}`}
                     className="transition hover:text-foreground"
                  >
                     {email}
                  </a>
               </div>
            </div>
         ) : null}

         <div className={cn('flex h-16 items-center gap-6', SHELL_X)}>
            <Link href="/" className="min-w-0 shrink-0 space-y-0.5">
               <p className="truncate text-sm font-semibold tracking-tight md:text-base">
                  {config.store.name}
               </p>
               {config.store.tagline ? (
                  <p className="hidden truncate text-xs text-muted-foreground lg:block">
                     {truncate(config.store.tagline)}
                  </p>
               ) : null}
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
               {CORPORATE_NAV_LINKS.map(({ key, href }) => {
                  const active =
                     href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(href)
                  return (
                     <CorporateNavLink
                        key={href}
                        href={href}
                        label={copy[key]}
                        active={active}
                     />
                  )
               })}
            </nav>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
               <div className="hidden sm:block">
                  <CommandMenu />
               </div>
               <Link href="/cart" className="hidden sm:block">
                  <Button size="icon" variant="ghost" className="h-9 w-9">
                     <ShoppingBasketIcon className="h-4 w-4" />
                     <span className="sr-only">Cart</span>
                  </Button>
               </Link>
               <ThemeToggle />
               {authenticated ? (
                  <UserNav />
               ) : (
                  <Link href="/login" className="hidden md:block">
                     <Button variant="ghost" size="sm" className="gap-1.5">
                        <LogInIcon className="h-4 w-4" />
                        {copy.login}
                     </Button>
                  </Link>
               )}
               <Button asChild size="sm" className="hidden sm:inline-flex">
                  <Link href="/contact">{copy.contactCta}</Link>
               </Button>
               <CorporateMobileNav />
            </div>
         </div>
      </header>
   )
}

function CorporateMobileNav() {
   const copy = getCorporateNavCopy()
   const pathname = usePathname()
   const [open, setOpen] = useState(false)

   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9 lg:hidden">
               <Menu className="h-4 w-4" />
               <span className="sr-only">{copy.menu}</span>
            </Button>
         </SheetTrigger>
         <SheetContent side="right" className="w-[min(100vw-2rem,20rem)]">
            <div className="mb-6 space-y-1 border-b pb-4">
               <p className="font-semibold">{config.store.name}</p>
               <p className="text-xs text-muted-foreground">
                  {truncate(config.store.tagline || config.store.description, 64)}
               </p>
            </div>
            <nav className="flex flex-col gap-1">
               {CORPORATE_NAV_LINKS.map(({ key, href }) => {
                  const active =
                     href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(href)
                  return (
                     <CorporateMobileNavLink
                        key={href}
                        href={href}
                        label={copy[key]}
                        active={active}
                        onClick={() => setOpen(false)}
                     />
                  )
               })}
            </nav>
            <div className="mt-6 flex flex-col gap-2 border-t pt-4">
               <Button asChild>
                  <Link href="/contact" onClick={() => setOpen(false)}>
                     {copy.contactCta}
                  </Link>
               </Button>
               <Button asChild variant="outline">
                  <Link href="/products" onClick={() => setOpen(false)}>
                     {copy.products}
                  </Link>
               </Button>
            </div>
         </SheetContent>
      </Sheet>
   )
}

function ThemeToggle() {
   const { resolvedTheme, setTheme } = useTheme()

   return (
      <Button
         variant="ghost"
         size="icon"
         className="h-9 w-9"
         onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
         {resolvedTheme === 'dark' ? (
            <SunIcon className="h-4 w-4" />
         ) : (
            <MoonIcon className="h-4 w-4" />
         )}
      </Button>
   )
}
