'use client'

import { DataTable } from '@/components/ui/data-table'
import { StatusActions } from '@/components/status-actions'
import { ColumnDef } from '@tanstack/react-table'

export type BlogCommentColumn = {
   id: string
   blog: string
   author: string
   content: string
   status: string
   createdAt: string
}

export function BlogCommentsTable({ data }: { data: BlogCommentColumn[] }) {
   return <DataTable searchKey="blog" columns={columns} data={data} />
}

const columns: ColumnDef<BlogCommentColumn>[] = [
   { accessorKey: 'blog', header: 'Article' },
   { accessorKey: 'author', header: 'Author' },
   {
      accessorKey: 'content',
      header: 'Comment',
      cell: ({ row }) => (
         <p className="max-w-md truncate text-sm">{row.original.content}</p>
      ),
   },
   { accessorKey: 'status', header: 'Status' },
   { accessorKey: 'createdAt', header: 'Date' },
   {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
         <StatusActions
            id={row.original.id}
            apiPath="/api/blog-comments"
            statuses={[
               { value: 'Approved', label: 'Approve' },
               { value: 'Rejected', label: 'Reject', variant: 'destructive' },
            ]}
         />
      ),
   },
]
