import { formatMoney, getLocale } from '@/lib/locale'
import type { PriceTier } from '@/lib/product-metadata'

const TIER_HEADERS: Record<string, { qty: string; price: string; title: string }> = {
   en: { title: 'Batch pricing', qty: 'Qty', price: 'Unit price' },
   zh: { title: '批次价格', qty: '数量', price: '单价' },
   ja: { title: 'ロット価格', qty: '数量', price: '単価' },
}

function tierHeaders() {
   const lang = getLocale().language
   return TIER_HEADERS[lang] || TIER_HEADERS[lang.split('-')[0]] || TIER_HEADERS.en
}

export function PriceTiersTable({
   tiers,
   moq,
}: {
   tiers: PriceTier[]
   moq?: number
}) {
   if (!tiers.length) return null

   const headers = tierHeaders()
   const sorted = [...tiers].sort((a, b) => a.qty - b.qty)

   return (
      <div className="space-y-2">
         <p className="text-sm font-medium">{headers.title}</p>
         {moq ? (
            <p className="text-xs text-muted-foreground">
               MOQ: {moq}
            </p>
         ) : null}
         <div className="overflow-hidden rounded-md border">
            <table className="w-full text-sm">
               <thead className="bg-neutral-50 dark:bg-neutral-800">
                  <tr>
                     <th className="px-3 py-2 text-left font-medium">{headers.qty}</th>
                     <th className="px-3 py-2 text-left font-medium">{headers.price}</th>
                  </tr>
               </thead>
               <tbody>
                  {sorted.map((tier) => (
                     <tr key={tier.qty} className="border-t">
                        <td className="px-3 py-2">{tier.qty}+</td>
                        <td className="px-3 py-2">{formatMoney(tier.price)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}
