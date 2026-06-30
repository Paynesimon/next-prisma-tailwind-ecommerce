import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { format } from 'date-fns'

import { MessagesTable, type MessageColumn } from './components/table'

export default async function MessagesPage() {
   const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
   })

   const data: MessageColumn[] = messages.map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      subject: m.subject || '—',
      content: m.content,
      source: m.source,
      status: m.status,
      createdAt: format(m.createdAt, 'PPp'),
   }))

   return (
      <div className="my-6 space-y-4">
         <Heading
            title={`Messages (${messages.length})`}
            description="Contact and product inquiries from customers"
         />
         <Separator />
         <MessagesTable data={data} />
      </div>
   )
}
