import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

type Props = {
   title: string
   description?: string
   actionHref?: string
   actionLabel?: string
   children: React.ReactNode
}

export function HomeSection({
   title,
   description,
   actionHref,
   actionLabel,
   children,
}: Props) {
   return (
      <section className="space-y-6">
         <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
               <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {title}
               </h2>
               {description ? (
                  <p className="text-sm text-muted-foreground">{description}</p>
               ) : null}
            </div>
            {actionHref && actionLabel ? (
               <Button asChild variant="ghost" className="w-fit gap-1 px-0">
                  <Link href={actionHref}>
                     {actionLabel}
                     <ArrowRight className="h-4 w-4" />
                  </Link>
               </Button>
            ) : null}
         </div>
         {children}
      </section>
   )
}
