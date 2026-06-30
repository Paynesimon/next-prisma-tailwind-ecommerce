import { getLocale } from '@/lib/locale'

import { parseProductMetadata } from './product-metadata'

export function getProductMoq(product?: { metadata?: unknown } | null): number {
   const { moq } = parseProductMetadata(product?.metadata)
   return moq && moq > 1 ? moq : 1
}

export function isValidCartQuantity(count: number, moq: number): boolean {
   if (count <= 0) return true
   if (moq <= 1) return true
   return count >= moq
}

export function nextAddCount(currentCount: number, moq: number): number {
   if (currentCount <= 0) return moq
   return currentCount + 1
}

export function nextRemoveCount(currentCount: number, moq: number): number {
   if (currentCount <= 0) return 0
   if (moq > 1 && currentCount <= moq) return 0
   return currentCount - 1
}

export function formatMoqLabel(moq: number): string {
   if (moq <= 1) return ''
   const lang = getLocale().language
   const base = lang.split('-')[0]
   const labels: Record<string, (n: number) => string> = {
      en: (n) => `MOQ: ${n}`,
      zh: (n) => `起订量 ${n} 件`,
      ja: (n) => `最小ロット ${n}`,
   }
   const fn = labels[lang] || labels[base] || labels.en
   return fn(moq)
}

export function moqBelowMessage(moq: number, productTitle?: string): string {
   const lang = getLocale().language
   const base = lang.split('-')[0]
   const name = productTitle ? `「${productTitle}」` : ''
   const labels: Record<string, (n: number, p: string) => string> = {
      en: (n, p) =>
         p
            ? `${p} requires a minimum order of ${n} units.`
            : `Minimum order is ${n} units.`,
      zh: (n, p) =>
         p ? `${p} 起订量为 ${n} 件，请调整数量。` : `起订量为 ${n} 件。`,
      ja: (n, p) =>
         p
            ? `${p}の最小注文数は ${n} です。`
            : `最小注文数は ${n} です。`,
   }
   const fn = labels[lang] || labels[base] || labels.en
   return fn(moq, name)
}

export type CartMoqIssue = {
   productId: string
   title: string
   count: number
   moq: number
}

export function getCartMoqIssues(
   items: { productId: string; count: number; product?: { title?: string; metadata?: unknown } }[]
): CartMoqIssue[] {
   const issues: CartMoqIssue[] = []
   for (const item of items || []) {
      const moq = getProductMoq(item.product)
      if (!isValidCartQuantity(item.count, moq)) {
         issues.push({
            productId: item.productId,
            title: item.product?.title || '',
            count: item.count,
            moq,
         })
      }
   }
   return issues
}
