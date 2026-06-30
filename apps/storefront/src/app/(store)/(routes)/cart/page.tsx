import { getTheme } from '@/lib/theme'

import { ThemedCartPage } from '@/themes/cart/ThemedCartPage'

export default function CartPage() {
   const theme = getTheme()
   return <ThemedCartPage theme={theme} />
}
