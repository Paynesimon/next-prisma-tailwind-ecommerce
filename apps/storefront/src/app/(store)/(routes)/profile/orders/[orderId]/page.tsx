'use client'

import { useAuthenticated } from '@/hooks/useAuthentication'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { UserCombobox } from '../../components/switcher'
import { OrderDetailCard } from './components/order-reviews'

const ProductPage = ({ params }: { params: { orderId: string } }) => {
   const { authenticated } = useAuthenticated()
   const [order, setOrder] = useState(null)
   const [loading, setLoading] = useState(true)
   const pathname = usePathname()

   useEffect(() => {
      async function getOrder() {
         try {
            const response = await fetch(`/api/orders/${params.orderId}`, {
               method: 'GET',
               cache: 'no-store',
            })

            const json = await response.json()
            setOrder(json)
         } catch (error) {
            console.error({ error })
         } finally {
            setLoading(false)
         }
      }

      if (authenticated) getOrder()
   }, [authenticated, params.orderId])

   return (
      <div className="flex-col">
         <div className="flex-1">
            <div className="flex items-center justify-between">
               <UserCombobox initialValue={pathname} />
            </div>
            <OrderDetailCard order={order} loading={authenticated && loading} />
         </div>
      </div>
   )
}

export default ProductPage
