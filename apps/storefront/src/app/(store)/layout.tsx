import { getTheme, themeShellClass } from '@/lib/theme'
import { StoreChrome } from '@/themes/StoreChrome'
import { ThemeShell } from '@/themes'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {
   const theme = getTheme()

   return (
      <ThemeShell theme={theme}>
         <div className={themeShellClass(theme)}>
            <StoreChrome theme={theme}>{children}</StoreChrome>
         </div>
      </ThemeShell>
   )
}
