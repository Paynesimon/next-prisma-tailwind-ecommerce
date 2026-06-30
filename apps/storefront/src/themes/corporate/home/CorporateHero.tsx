import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Props = {
   storeName: string
   tagline: string
   description: string
   heroImage?: string
   contactLabel: string
   catalogLabel: string
}

export function CorporateHero({
   storeName,
   tagline,
   description,
   heroImage,
   contactLabel,
   catalogLabel,
}: Props) {
   return (
      <section className="relative -mx-[1.4rem] md:-mx-[4rem] lg:-mx-[6rem] xl:-mx-[8rem] 2xl:-mx-[12rem] border-b bg-gradient-to-b from-muted/40 to-background">
         <div className="grid items-center gap-10 px-[1.4rem] py-12 md:grid-cols-2 md:px-[4rem] md:py-16 lg:px-[6rem] lg:py-20 xl:px-[8rem] 2xl:px-[12rem]">
            <div className="space-y-6">
               <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  {storeName}
               </p>
               <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {tagline}
               </h1>
               {description ? (
                  <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                     {description}
                  </p>
               ) : null}
               <div className="flex flex-wrap gap-3 pt-1">
                  <Button asChild size="lg" className="gap-2">
                     <Link href="/contact">
                        {contactLabel}
                        <ArrowRight className="h-4 w-4" />
                     </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                     <Link href="/products">{catalogLabel}</Link>
                  </Button>
               </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted shadow-sm md:aspect-[5/4]">
               {heroImage ? (
                  <Image
                     src={heroImage}
                     alt=""
                     fill
                     priority
                     className="object-cover"
                     sizes="(min-width: 768px) 50vw, 100vw"
                  />
               ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-950" />
               )}
            </div>
         </div>
      </section>
   )
}
