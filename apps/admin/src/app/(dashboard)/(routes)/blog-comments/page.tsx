import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { format } from 'date-fns'

import { BlogCommentsTable, type BlogCommentColumn } from './components/table'

export default async function BlogCommentsPage() {
   const comments = await prisma.blogComment.findMany({
      include: {
         blog: { select: { title: true } },
         user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
   })

   const data: BlogCommentColumn[] = comments.map((c) => ({
      id: c.id,
      blog: c.blog.title,
      author: c.user?.name || c.guestName || c.user?.email || 'Guest',
      content: c.content,
      status: c.status,
      createdAt: format(c.createdAt, 'PPp'),
   }))

   return (
      <div className="my-6 space-y-4">
         <Heading
            title={`Blog comments (${comments.length})`}
            description="Moderate reader comments on blog articles"
         />
         <Separator />
         <BlogCommentsTable data={data} />
      </div>
   )
}
