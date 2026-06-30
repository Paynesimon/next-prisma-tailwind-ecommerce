import prisma from '@/lib/prisma'

export type ProductRatingSummary = {
   avg: number
   count: number
}

export async function getProductRatingSummaries(
   productIds: string[]
): Promise<Record<string, ProductRatingSummary>> {
   if (!productIds.length) return {}

   const rows = await prisma.productReview.groupBy({
      by: ['productId'],
      where: {
         productId: { in: productIds },
         status: 'Approved',
      },
      _avg: { rating: true },
      _count: { rating: true },
   })

   const summaries: Record<string, ProductRatingSummary> = {}
   for (const id of productIds) {
      summaries[id] = { avg: 0, count: 0 }
   }
   for (const row of rows) {
      summaries[row.productId] = {
         avg: row._avg.rating ?? 0,
         count: row._count.rating,
      }
   }
   return summaries
}
