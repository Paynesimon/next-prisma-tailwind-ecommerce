import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { format } from 'date-fns'

import { ReviewsTable, type ReviewColumn } from './components/table'

export default async function ReviewsPage() {
   const reviews = await prisma.productReview.findMany({
      include: {
         product: { select: { title: true } },
         user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
   })

   const data: ReviewColumn[] = reviews.map((r) => ({
      id: r.id,
      product: r.product.title,
      user: r.user.name || r.user.email || r.userId,
      rating: r.rating,
      text: r.text,
      status: r.status,
      createdAt: format(r.createdAt, 'PPp'),
   }))

   return (
      <div className="my-6 space-y-4">
         <Heading
            title={`Reviews (${reviews.length})`}
            description="Moderate product reviews before they appear on the storefront"
         />
         <Separator />
         <ReviewsTable data={data} />
      </div>
   )
}
