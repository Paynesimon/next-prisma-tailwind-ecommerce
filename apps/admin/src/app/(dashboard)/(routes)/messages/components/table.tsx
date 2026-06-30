'use client'

import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { StatusActions } from '@/components/status-actions'

export type MessageColumn = {
   id: string
   name: string
   email: string
   subject: string
   content: string
   source: string
   status: string
   createdAt: string
}

export function MessagesTable({ data }: { data: MessageColumn[] }) {
   return <DataTable searchKey="name" columns={columns} data={data} />
}

const columns: ColumnDef<MessageColumn>[] = [
   { accessorKey: 'name', header: 'Name' },
   { accessorKey: 'email', header: 'Email' },
   { accessorKey: 'subject', header: 'Subject' },
   {
      accessorKey: 'content',
      header: 'Message',
      cell: ({ row }) => (
         <p className="max-w-md truncate text-sm">{row.original.content}</p>
      ),
   },
   { accessorKey: 'source', header: 'Source' },
   { accessorKey: 'status', header: 'Status' },
   { accessorKey: 'createdAt', header: 'Date' },
   {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
         <StatusActions
            id={row.original.id}
            apiPath="/api/messages"
            statuses={[
               { value: 'Read', label: 'Read' },
               { value: 'Replied', label: 'Replied' },
               { value: 'Archived', label: 'Archive' },
            ]}
         />
      ),
   },
]
