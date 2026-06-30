'use client'

import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { Loader } from '@/components/ui/loader'
import { getFeedbackCopy } from '@/lib/feedback-copy'
import Link from 'next/link'

export function OrderReviewLinks({ order }: { order: any }) {
   const copy = getFeedbackCopy()

   if (!order?.isPaid || !order?.orderItems?.length) return null

   return (
      <Card className="my-4">
         <CardHeader>
            <CardTitle className="text-base">{copy.writeReview}</CardTitle>
         </CardHeader>
         <CardContent className="space-y-2">
            {order.orderItems.map((item: any) => (
               <div
                  key={item.productId}
                  className="flex items-center justify-between gap-4 text-sm"
               >
                  <span>{item.product?.title}</span>
                  <Button asChild size="sm" variant="outline">
                     <Link href={`/products/${item.productId}`}>
                        {copy.writeReview}
                     </Link>
                  </Button>
               </div>
            ))}
         </CardContent>
      </Card>
   )
}

export function OrderDetailCard({
   order,
   loading,
}: {
   order: any
   loading: boolean
}) {
   if (loading) {
      return (
         <Card className="my-4">
            <CardContent className="flex h-[20vh] items-center justify-center">
               <Loader />
            </CardContent>
         </Card>
      )
   }

   if (!order) return null

   return (
      <>
         <Card className="my-4">
            <CardHeader>
               <CardTitle>Order #{order.number}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
               <p>Status: {order.status}</p>
               <p>Paid: {order.isPaid ? 'Yes' : 'No'}</p>
               <p>Total: ${order.payable}</p>
            </CardContent>
         </Card>
         <OrderReviewLinks order={order} />
      </>
   )
}
