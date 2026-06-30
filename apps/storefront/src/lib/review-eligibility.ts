import prisma from '@/lib/prisma'

export async function getPaidOrderForProduct(
   userId: string,
   productId: string
): Promise<{ orderId: string } | null> {
   const item = await prisma.orderItem.findFirst({
      where: {
         productId,
         order: {
            userId,
            isPaid: true,
         },
      },
      select: { orderId: true },
      orderBy: { order: { createdAt: 'desc' } },
   })

   return item ? { orderId: item.orderId } : null
}

export async function canUserReviewProduct(
   userId: string,
   productId: string
): Promise<boolean> {
   const order = await getPaidOrderForProduct(userId, productId)
   return !!order
}
