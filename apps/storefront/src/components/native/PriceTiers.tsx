import { formatMoney } from '@/lib/locale'
import { getMessages } from '@/i18n'
import type { PriceTier } from '@/lib/product-metadata'

export function PriceTiersTable({
   tiers,
   moq,
}: {
   tiers: PriceTier[]
   moq?: number
}) {
   if (!tiers.length) return null

   const headers = getMessages().product
   const sorted = [...tiers].sort((a, b) => a.qty - b.qty)

   return (
      <div className="space-y-2">
         <p className="text-sm font-medium">{headers.priceTiersTitle}</p>
         <table className="w-full text-sm">
            <thead>
               <tr className="border-b text-left text-muted-foreground">
                  <th className="py-1 pr-4">{headers.priceTiersQty}</th>
                  <th className="py-1">{headers.priceTiersPrice}</th>
               </tr>
            </thead>
            <tbody>
               {sorted.map((tier) => (
                  <tr key={tier.qty} className="border-b border-border/50">
                     <td className="py-1.5 pr-4">
                        {tier.qty}
                        {moq && tier.qty === moq ? ' (MOQ)' : ''}
                     </td>
                     <td className="py-1.5">{formatMoney(tier.price)}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}
