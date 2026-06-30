import { ThemeMain, ThemeContentShell } from '@/themes/shared/ThemeMain'

import { BlogFooter } from './BlogFooter'
import { BlogHeader } from './BlogHeader'

export function BlogChrome({ children }: { children: React.ReactNode }) {
   return (
      <>
         <BlogHeader />
         <ThemeContentShell>
            <ThemeMain theme="blog">{children}</ThemeMain>
         </ThemeContentShell>
         <BlogFooter />
      </>
   )
}
