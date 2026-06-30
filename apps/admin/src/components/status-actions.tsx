'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function StatusActions({
   id,
   apiPath,
   statuses,
}: {
   id: string
   apiPath: string
   statuses: { value: string; label: string; variant?: 'default' | 'outline' | 'destructive' }[]
}) {
   const router = useRouter()
   const [loading, setLoading] = useState<string | null>(null)

   async function update(status: string) {
      setLoading(status)
      try {
         await fetch(`${apiPath}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
         })
         router.refresh()
      } finally {
         setLoading(null)
      }
   }

   return (
      <div className="flex flex-wrap gap-1">
         {statuses.map((s) => (
            <Button
               key={s.value}
               size="sm"
               variant={s.variant || 'outline'}
               disabled={loading === s.value}
               onClick={() => update(s.value)}
            >
               {s.label}
            </Button>
         ))}
      </div>
   )
}
