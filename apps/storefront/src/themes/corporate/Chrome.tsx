import { ThemeMain, ThemeContentShell } from '@/themes/shared/ThemeMain'

import { CorporateFooter } from './CorporateFooter'
import { CorporateHeader } from './CorporateHeader'

export function CorporateChrome({ children }: { children: React.ReactNode }) {
   return (
      <>
         <CorporateHeader />
         <ThemeContentShell>
            <ThemeMain theme="corporate">{children}</ThemeMain>
         </ThemeContentShell>
         <CorporateFooter />
      </>
   )
}
