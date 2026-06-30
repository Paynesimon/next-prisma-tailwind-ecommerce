import { cn } from '@/lib/utils'
import type { StorefrontTheme } from '@/lib/theme'

export function blogProseClass(theme: StorefrontTheme = 'blog'): string {
   return cn(
      'prose prose-neutral max-w-none dark:prose-invert',
      theme === 'blog' && 'prose-lg font-serif prose-headings:font-serif prose-headings:tracking-tight',
      theme === 'corporate' && 'prose-base prose-headings:font-semibold',
      theme === 'shop' && 'prose-base'
   )
}
