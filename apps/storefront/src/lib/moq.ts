import { t } from '@/i18n'

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
   return t('product.moqLabel', { count: moq })
}

export function moqBelowMessage(moq: number, productTitle?: string): string {
   if (productTitle) {
      return t('product.moqBelowNamed', { name: productTitle, count: moq })
   }
   return t('product.moqBelow', { count: moq })
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
