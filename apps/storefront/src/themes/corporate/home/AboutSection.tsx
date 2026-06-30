import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { getCorporateHomeCopy } from './copy'

function excerpt(text: string, max = 520): string {
   const clean = text.replace(/\s+/g, ' ').trim()
   if (clean.length <= max) return clean
   return `${clean.slice(0, max).trim()}…`
}

type Props = {
   storeName: string
   brandStory: string
}

export function AboutSection({ storeName, brandStory }: Props) {
   const copy = getCorporateHomeCopy()
   const story = brandStory?.trim()

   if (!story) return null

   return (
      <section className="grid gap-8 md:grid-cols-[1fr_2fr] md:items-start">
         <div className="space-y-2">
            <p className="text-sm font-medium text-primary">{storeName}</p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
               {copy.aboutTitle}
            </h2>
            <p className="text-sm text-muted-foreground">{copy.aboutDesc}</p>
         </div>
         <div className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
               {excerpt(story)}
            </p>
            <Button asChild variant="outline">
               <Link href="/about">{copy.learnMore}</Link>
            </Button>
         </div>
      </section>
   )
}
