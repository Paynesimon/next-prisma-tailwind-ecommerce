import { getTheme } from '@/lib/theme'
import type { StorefrontTheme } from '@/lib/theme'
import { BlogChrome } from '@/themes/blog/Chrome'
import { CorporateChrome } from '@/themes/corporate/Chrome'
import { ShopChrome } from '@/themes/shop/Chrome'

export function StoreChrome({
   theme,
   children,
}: {
   theme: StorefrontTheme
   children: React.ReactNode
}) {
   switch (theme) {
      case 'corporate':
         return <CorporateChrome>{children}</CorporateChrome>
      case 'blog':
         return <BlogChrome>{children}</BlogChrome>
      default:
         return <ShopChrome>{children}</ShopChrome>
   }
}
