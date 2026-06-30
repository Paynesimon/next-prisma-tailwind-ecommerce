import type { StorefrontTheme } from '@/lib/theme'

import { SHELL_X, themeMainClass } from './theme-styles'

export function ThemeMain({
   theme,
   children,
}: {
   theme: StorefrontTheme
   children: React.ReactNode
}) {
   return <main className={themeMainClass(theme)}>{children}</main>
}

export function ThemeContentShell({
   children,
}: {
   children: React.ReactNode
}) {
   return <div className={SHELL_X}>{children}</div>
}
