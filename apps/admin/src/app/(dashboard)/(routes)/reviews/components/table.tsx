'use client'

import { DataTable } from '@/components/ui/data-table'
import { StatusActions } from '@/components/status-actions'
import { ColumnDef } from '@tanstack/react-table'

export type ReviewColumn = {
   id: string
   product: string
   user: string
   rating: number
   text: string
   status: string
   createdAt: string
}

export function ReviewsTable({ data }: { data: ReviewColumn[] }) {
   return <DataTable searchKey="product" columns={columns} data={data} />
}

const columns: ColumnDef<ReviewColumn>[] = [
   { accessorKey: 'product', header: 'Product' },
   { accessorKey: 'user', header: 'User' },
   { accessorKey: 'rating', header: 'Rating' },
   {
      accessorKey: 'text',
      header: 'Review',
      cell: ({ row }) => (
         <p className="max-w-md truncate text-sm">{row.original.text}</p>
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
            apiPath="/api/reviews"
            statuses={[
               { value: 'Approved', label: 'Approve' },
               { value: 'Rejected', label: 'Reject', variant: 'destructive' },
            ]}
         />
      ),
   },
]
