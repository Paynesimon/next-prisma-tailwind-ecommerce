'use client'

import { WholesaleContact } from '@/components/native/WholesaleContact'
import { getCartMoqIssues, moqBelowMessage } from '@/lib/moq'
import { useCartContext } from '@/state/Cart'
import { AlertTriangle } from 'lucide-react'

export function CartMoqAlerts() {
   const { cart } = useCartContext()
   const issues = getCartMoqIssues(cart?.items || [])

   if (!issues.length) return null

   return (
      <div className="mb-4 space-y-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4">
         <div className="flex items-start gap-2 text-amber-900 dark:text-amber-200">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="space-y-2 text-sm">
               {issues.map((issue) => (
                  <p key={issue.productId}>
                     {moqBelowMessage(issue.moq, issue.title)} (
                     {issue.count}/{issue.moq})
                  </p>
               ))}
            </div>
         </div>
         <WholesaleContact />
      </div>
   )
}
