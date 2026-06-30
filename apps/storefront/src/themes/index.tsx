import type { StorefrontTheme } from '@/lib/theme'

import { BlogThemeShell } from './blog'
import { CorporateThemeShell } from './corporate'
import { ShopThemeShell } from './shop'

export function ThemeShell({
   theme,
   children,
}: {
   theme: StorefrontTheme
   children: React.ReactNode
}) {
   switch (theme) {
      case 'corporate':
         return <CorporateThemeShell>{children}</CorporateThemeShell>
      case 'blog':
         return <BlogThemeShell>{children}</BlogThemeShell>
      default:
         return <ShopThemeShell>{children}</ShopThemeShell>
   }
}
