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
   Menu,
   MoonIcon,
   ShoppingBasketIcon,
   SunIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { AnimatedNavLink } from '@/themes/shared/AnimatedNavLink'
import { SHELL_X } from '@/themes/shared/theme-styles'

import { getShopNavCopy, SHOP_NAV_LINKS } from './nav-copy'
import { ShopCatalogMenu, ShopMobileCatalog } from './ShopCatalogMenu'

export function ShopHeader() {
   const copy = getShopNavCopy()
   const pathname = usePathname()
   const { authenticated } = useAuthenticated()

   return (
      <header className="sticky top-0 z-50 mb-4 border-b-2 border-primary/20 bg-background/95 shadow-sm backdrop-blur-md">
         <div className={cn('flex h-14 items-center gap-4 lg:h-16', SHELL_X)}>
            <Link
               href="/"
               className="shrink-0 text-base font-bold tracking-tight text-primary md:text-lg"
            >
               {config.store.name}
            </Link>

            <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
               {SHOP_NAV_LINKS.map(({ key, href }) => {
                  const active =
                     href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(href)
                  return (
                     <AnimatedNavLink
                        key={href}
                        href={href}
                        label={copy[key]}
                        active={active}
                     />
                  )
               })}
            </div>

            <ShopCatalogMenu />

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
               <div className="hidden sm:block">
                  <CommandMenu />
               </div>
               <Link href="/cart" className="hidden sm:flex">
                  <Button variant="outline" size="sm" className="gap-1.5">
                     <ShoppingBasketIcon className="h-4 w-4" />
                     <span className="hidden md:inline">{copy.cart}</span>
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
                  <Link href="/products">{copy.shopNow}</Link>
               </Button>
               <ShopMobileNav />
            </div>
         </div>
      </header>
   )
}

function ShopMobileNav() {
   const copy = getShopNavCopy()
   const pathname = usePathname()
   const [open, setOpen] = useState(false)

   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9 md:hidden">
               <Menu className="h-4 w-4" />
               <span className="sr-only">{copy.menu}</span>
            </Button>
         </SheetTrigger>
         <SheetContent side="left" className="w-[min(100vw-2rem,18rem)]">
            <p className="mb-4 font-bold text-primary">{config.store.name}</p>
            <nav className="flex flex-col gap-1">
               {SHOP_NAV_LINKS.map(({ key, href }) => {
                  const active =
                     href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(href)
                  return (
                     <AnimatedNavLink
                        key={href}
                        href={href}
                        label={copy[key]}
                        active={active}
                        onClick={() => setOpen(false)}
                     />
                  )
               })}
            </nav>
            <ShopMobileCatalog />
            <div className="mt-6 flex flex-col gap-2 border-t pt-4">
               <Button asChild>
                  <Link href="/products" onClick={() => setOpen(false)}>
                     {copy.shopNow}
                  </Link>
               </Button>
               <Button asChild variant="outline">
                  <Link href="/cart" onClick={() => setOpen(false)}>
                     {copy.cart}
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
