import prisma from '@/lib/prisma'

export async function getSoldCount(productId: string): Promise<number> {
   const result = await prisma.orderItem.aggregate({
      where: {
         productId,
         order: { isPaid: true },
      },
      _sum: { count: true },
   })
   return result._sum.count ?? 0
}

export async function getSoldCounts(
   productIds: string[]
): Promise<Record<string, number>> {
   if (!productIds.length) return {}

   const rows = await prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
         productId: { in: productIds },
         order: { isPaid: true },
      },
      _sum: { count: true },
   })

   const counts: Record<string, number> = {}
   for (const id of productIds) counts[id] = 0
   for (const row of rows) {
      counts[row.productId] = row._sum.count ?? 0
   }
   return counts
}
