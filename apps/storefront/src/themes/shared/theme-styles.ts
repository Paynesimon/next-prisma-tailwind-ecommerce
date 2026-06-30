import type { StorefrontTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

export const SHELL_X =
   'px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]'

export function themeMainClass(theme: StorefrontTheme): string {
   const base = 'min-h-[50vh] flex-1 py-6 md:py-8'

   switch (theme) {
      case 'corporate':
         return cn(
            base,
            'corporate-inner [&_.rounded-lg]:shadow-sm [&_h3]:font-semibold [&_h3]:tracking-tight'
         )
      case 'blog':
         return cn(
            base,
            'blog-inner [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold'
         )
      default:
         return cn(
            base,
            'shop-inner [&_.rounded-lg]:transition-shadow [&_.rounded-lg]:hover:shadow-md'
         )
   }
}

export function themeHeadingClass(theme: StorefrontTheme): string {
   switch (theme) {
      case 'corporate':
         return 'mb-8 border-b border-border/60 pb-6'
      case 'blog':
         return 'mb-10'
      default:
         return 'my-4'
   }
}

export function themeTitleClass(theme: StorefrontTheme): string {
   switch (theme) {
      case 'corporate':
         return 'text-2xl font-semibold tracking-tight md:text-3xl'
      case 'blog':
         return 'font-serif text-3xl font-bold tracking-tight md:text-4xl'
      default:
         return 'text-3xl font-bold tracking-tight'
   }
}
