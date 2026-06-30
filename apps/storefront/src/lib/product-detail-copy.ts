import { getMessages } from '@/i18n'

export type ProductDetailCopy = ReturnType<typeof getProductDetailCopy>

export function getProductDetailCopy() {
   return getMessages().product
}
