import { ThemeMain } from '@/themes/shared/ThemeMain'
import { ThemeContentShell } from '@/themes/shared/ThemeMain'

import { ShopFooter } from './ShopFooter'
import { ShopHeader } from './ShopHeader'

export function ShopChrome({ children }: { children: React.ReactNode }) {
   return (
      <>
         <ShopHeader />
         <ThemeContentShell>
            <ThemeMain theme="shop">{children}</ThemeMain>
         </ThemeContentShell>
         <ShopFooter />
      </>
   )
}
