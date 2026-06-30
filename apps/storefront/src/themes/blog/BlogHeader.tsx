'use client'

import { UserNav } from '@/components/native/nav/user'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { config } from '@/lib/config'
import { cn } from '@/lib/utils'
import { LogInIcon, Menu, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { AnimatedNavLink } from '@/themes/shared/AnimatedNavLink'
import { SHELL_X } from '@/themes/shared/theme-styles'

import { BLOG_NAV_LINKS, getBlogNavCopy } from './nav-copy'

export function BlogHeader() {
   const copy = getBlogNavCopy()
   const pathname = usePathname()
   const { authenticated } = useAuthenticated()

   return (
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md">
         <div
            className={cn(
               'flex h-14 items-center justify-between gap-4 md:h-16',
               SHELL_X
            )}
         >
            <Link href="/" className="min-w-0 shrink-0">
               <p className="truncate font-serif text-lg font-semibold tracking-tight md:text-xl">
                  {config.store.name}
               </p>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
               {BLOG_NAV_LINKS.map(({ key, href }) => {
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
                        variant="blog"
                     />
                  )
               })}
            </nav>

            <div className="flex items-center gap-1.5">
               <ThemeToggle />
               {authenticated ? (
                  <UserNav />
               ) : (
                  <Link href="/login" className="hidden sm:block">
                     <Button variant="ghost" size="sm">
                        {copy.login}
                     </Button>
                  </Link>
               )}
               <BlogMobileNav />
            </div>
         </div>
      </header>
   )
}

function BlogMobileNav() {
   const copy = getBlogNavCopy()
   const pathname = usePathname()
   const [open, setOpen] = useState(false)

   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
               <Menu className="h-5 w-5" />
               <span className="sr-only">{copy.menu}</span>
            </Button>
         </SheetTrigger>
         <SheetContent side="right">
            <p className="mb-4 font-serif text-lg font-semibold">
               {config.store.name}
            </p>
            <nav className="flex flex-col gap-1">
               {BLOG_NAV_LINKS.map(({ key, href }) => {
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
                        variant="blog"
                     />
                  )
               })}
            </nav>
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
