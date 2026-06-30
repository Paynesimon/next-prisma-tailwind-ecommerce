import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { config } from '@/lib/config'

import { getHomeCopy } from './copy'

function excerpt(text: string, max = 280): string {
   const clean = text.replace(/\s+/g, ' ').trim()
   if (clean.length <= max) return clean
   return `${clean.slice(0, max).trim()}…`
}

export function BrandStorySection() {
   const copy = getHomeCopy()
   const story = config.store.brandStory?.trim()

   if (!story) return null

   return (
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-muted/80 via-background to-muted/40 p-6 md:p-10">
         <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
         <div className="relative max-w-3xl space-y-4">
            <p className="text-sm font-medium text-primary">{config.store.name}</p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
               {copy.brandTitle}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
               {excerpt(story)}
            </p>
            <Button asChild variant="outline">
               <Link href="/about">{copy.readStory}</Link>
            </Button>
         </div>
      </section>
   )
}
