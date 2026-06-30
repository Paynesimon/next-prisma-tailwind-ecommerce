'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
   images: string[]
   title: string
   tagline: string
   shopNowLabel: string
   learnMoreLabel: string
}

export function HeroSection({
   images,
   title,
   tagline,
   shopNowLabel,
   learnMoreLabel,
}: Props) {
   const slides = images.filter(Boolean)
   const hasSlides = slides.length > 0
   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: hasSlides && slides.length > 1 }, [
      Autoplay({ delay: 5000 }),
   ])
   const [selectedIndex, setSelectedIndex] = useState(0)

   useEffect(() => {
      function selectHandler() {
         setSelectedIndex(emblaApi?.selectedScrollSnap() ?? 0)
      }
      emblaApi?.on('select', selectHandler)
      return () => {
         emblaApi?.off('select', selectHandler)
      }
   }, [emblaApi])

   return (
      <section className="relative -mx-[1.4rem] md:-mx-[4rem] lg:-mx-[6rem] xl:-mx-[8rem] 2xl:-mx-[12rem]">
         {hasSlides ? (
            <div className="overflow-hidden" ref={emblaRef}>
               <div className="flex">
                  {slides.map((src, i) => (
                     <div
                        className="relative min-h-[22rem] flex-[0_0_100%] sm:min-h-[26rem] md:min-h-[30rem] lg:min-h-[34rem]"
                        key={i}
                     >
                        <Image
                           src={src}
                           alt=""
                           fill
                           priority={i === 0}
                           className="object-cover"
                           sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                     </div>
                  ))}
               </div>
            </div>
         ) : (
            <div className="relative min-h-[22rem] bg-gradient-to-br from-primary/30 via-primary/10 to-background sm:min-h-[26rem] md:min-h-[30rem] lg:min-h-[34rem]" />
         )}

         <div className="pointer-events-none absolute inset-0 flex items-end">
            <div className="pointer-events-auto w-full px-[1.4rem] pb-10 md:px-[4rem] md:pb-14 lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
               <div
                  className={cn(
                     'max-w-2xl space-y-4',
                     hasSlides ? 'text-white' : 'text-foreground'
                  )}
               >
                  <p
                     className={cn(
                        'text-xs font-medium uppercase tracking-[0.2em]',
                        hasSlides ? 'text-white/80' : 'text-muted-foreground'
                     )}
                  >
                     {title}
                  </p>
                  <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                     {tagline}
                  </h1>
                  <div className="flex flex-wrap gap-3 pt-2">
                     <Button asChild size="lg" className="gap-2">
                        <Link href="/products">
                           {shopNowLabel}
                           <ArrowRight className="h-4 w-4" />
                        </Link>
                     </Button>
                     <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className={cn(
                           hasSlides &&
                              'border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white'
                        )}
                     >
                        <Link href="/about">{learnMoreLabel}</Link>
                     </Button>
                  </div>
               </div>
            </div>
         </div>

         {hasSlides && slides.length > 1 ? (
            <div className="absolute bottom-4 right-[1.4rem] flex gap-2 md:right-[4rem] lg:right-[6rem] xl:right-[8rem] 2xl:right-[12rem]">
               {slides.map((_, index) => (
                  <button
                     key={index}
                     type="button"
                     aria-label={`Slide ${index + 1}`}
                     onClick={() => emblaApi?.scrollTo(index)}
                     className={cn(
                        'h-2 rounded-full transition-all',
                        index === selectedIndex
                           ? 'w-8 bg-white'
                           : 'w-2 bg-white/50 hover:bg-white/80'
                     )}
                  />
               ))}
            </div>
         ) : null}
      </section>
   )
}
