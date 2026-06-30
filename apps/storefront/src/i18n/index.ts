import { getLocale } from '@/lib/locale'

import ar from './messages/ar.json'
import en from './messages/en.json'
import es from './messages/es.json'
import ja from './messages/ja.json'
import pt from './messages/pt.json'
import ru from './messages/ru.json'
import zhCN from './messages/zh-CN.json'
import type { Messages, SupportedLocale } from './types'

const MESSAGES: Record<SupportedLocale, Messages> = {
   en: en as Messages,
   'zh-CN': zhCN as Messages,
   ja: ja as Messages,
   ru: ru as Messages,
   es: es as Messages,
   pt: pt as Messages,
   ar: ar as Messages,
}

const BASE_LOCALE_MAP: Record<string, SupportedLocale> = {
   en: 'en',
   zh: 'zh-CN',
   ja: 'ja',
   ru: 'ru',
   es: 'es',
   pt: 'pt',
   ar: 'ar',
}

export function resolveLocale(language: string): SupportedLocale {
   const raw = String(language || 'en').trim()
   const lower = raw.toLowerCase()

   if (lower in MESSAGES) return lower as SupportedLocale
   if (raw in MESSAGES) return raw as SupportedLocale
   if (lower === 'zh-cn' || lower === 'zh-hans' || lower === 'zh') return 'zh-CN'
   if (lower.startsWith('pt')) return 'pt'
   if (lower.startsWith('es')) return 'es'
   if (lower.startsWith('ar')) return 'ar'

   const base = lower.split('-')[0]
   return BASE_LOCALE_MAP[base] || 'en'
}

export function getMessages(): Messages {
   const locale = resolveLocale(getLocale().language)
   return MESSAGES[locale]
}

function getNestedValue(obj: unknown, path: string): unknown {
   return path.split('.').reduce<unknown>((current, key) => {
      if (current && typeof current === 'object' && key in current) {
         return (current as Record<string, unknown>)[key]
      }
      return undefined
   }, obj)
}

export function t(
   key: string,
   params?: Record<string, string | number>
): string {
   const locale = resolveLocale(getLocale().language)
   const raw =
      getNestedValue(MESSAGES[locale], key) ??
      getNestedValue(MESSAGES.en, key)

   if (typeof raw !== 'string') return key

   let value = raw

   if (params) {
      for (const [paramKey, paramValue] of Object.entries(params)) {
         value = value.replace(
            new RegExp(`\\{${paramKey}\\}`, 'g'),
            String(paramValue)
         )
      }
   }

   return value
}

export function isRtlLocale(language?: string): boolean {
   const lang = String(language ?? getLocale().language).toLowerCase()
   return lang === 'ar' || lang.startsWith('ar-')
}

export { MESSAGES, type Messages, type SupportedLocale }
