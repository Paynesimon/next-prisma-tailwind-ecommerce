import { getMessages } from '@/i18n'
import type { StorefrontTheme } from '@/lib/theme'

export type FeedbackCopy = ReturnType<typeof getFeedbackCopy>

export function getFeedbackCopy() {
   return getMessages().feedback
}

export function feedbackSectionClass(theme: StorefrontTheme): string {
   switch (theme) {
      case 'blog':
         return 'font-serif'
      case 'corporate':
         return 'rounded-lg border bg-card p-6 shadow-sm'
      default:
         return 'rounded-lg border p-6'
   }
}
