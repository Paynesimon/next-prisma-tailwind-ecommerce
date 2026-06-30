import { getTheme } from '@/lib/theme'
import { ThemedContactPage } from '@/themes/contact/ThemedContactPage'

export default function ContactPage() {
   return <ThemedContactPage theme={getTheme()} />
}
