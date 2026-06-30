import { config } from './config'

export type StorefrontTheme = 'shop' | 'corporate' | 'blog'

const VALID_THEMES: StorefrontTheme[] = ['shop', 'corporate', 'blog']

export function normalizeTheme(value: unknown): StorefrontTheme {
   const raw = String(value || 'shop')
      .trim()
      .toLowerCase()
   if (VALID_THEMES.includes(raw as StorefrontTheme)) {
      return raw as StorefrontTheme
   }
   return 'shop'
}

export function getTheme(): StorefrontTheme {
   const fromEnv = process.env.NEXT_PUBLIC_THEME
   const fromConfig = (config as { theme?: string }).theme
   return normalizeTheme(fromEnv || fromConfig || 'shop')
}

export function themeShellClass(theme: StorefrontTheme): string {
   switch (theme) {
      case 'corporate':
         return 'theme-corporate'
      case 'blog':
         return 'theme-blog'
      default:
         return 'theme-shop'
   }
}
