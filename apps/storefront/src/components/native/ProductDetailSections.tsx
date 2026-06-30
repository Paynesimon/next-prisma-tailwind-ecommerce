import { Separator } from '@/components/native/separator'
import { getProductDetailCopy } from '@/lib/product-detail-copy'
import { parseProductMetadata } from '@/lib/product-metadata'
import { getTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'
import { blogProseClass } from '@/themes/blog/blog-prose'
import type { StorefrontTheme } from '@/lib/theme'

function sectionShell(theme: StorefrontTheme, className?: string) {
   switch (theme) {
      case 'corporate':
         return cn(
            'rounded-lg border bg-card p-6 shadow-sm',
            className
         )
      case 'blog':
         return cn('rounded-lg border border-border/60 bg-card/50 p-6', className)
      default:
         return cn('rounded-lg border bg-neutral-50 p-6 dark:bg-neutral-900/50', className)
   }
}

export function ProductDetailSections({
   description,
   metadata: rawMetadata,
   theme: themeProp,
}: {
   description?: string | null
   metadata?: unknown
   theme?: StorefrontTheme
}) {
   const theme = themeProp ?? getTheme()
   const copy = getProductDetailCopy()
   const metadata = parseProductMetadata(rawMetadata)
   const overview = description?.trim() || ''
   const specs = metadata.specs || []
   const detailHtml = metadata.detailHtml

   if (!overview && !specs.length && !detailHtml) return null

   const sections = [
      overview
         ? { id: 'overview', title: copy.overview, content: 'overview' as const }
         : null,
      specs.length
         ? { id: 'specs', title: copy.specs, content: 'specs' as const }
         : null,
      detailHtml
         ? { id: 'details', title: copy.details, content: 'details' as const }
         : null,
   ].filter(Boolean) as Array<{
      id: string
      title: string
      content: 'overview' | 'specs' | 'details'
   }>

   return (
      <div className="mt-10 space-y-6">
         {sections.length > 1 ? (
            <nav
               className="flex flex-wrap gap-2"
               aria-label="Product detail sections"
            >
               {sections.map((section) => (
                  <a
                     key={section.id}
                     href={`#${section.id}`}
                     className="rounded-full border px-3 py-1 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground"
                  >
                     {section.title}
                  </a>
               ))}
            </nav>
         ) : null}

         {overview ? (
            <section id="overview" className={sectionShell(theme)}>
               <h2 className="mb-3 text-lg font-semibold">{copy.overview}</h2>
               <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {overview}
               </p>
            </section>
         ) : null}

         {specs.length ? (
            <section id="specs" className={sectionShell(theme)}>
               <h2 className="mb-4 text-lg font-semibold">{copy.specs}</h2>
               <div className="overflow-x-auto">
                  <table className="w-full min-w-[280px] border-collapse text-sm">
                     <thead>
                        <tr className="border-b text-left text-muted-foreground">
                           <th className="py-2 pr-4 font-medium">{copy.specLabel}</th>
                           <th className="py-2 font-medium">{copy.specValue}</th>
                        </tr>
                     </thead>
                     <tbody>
                        {specs.map((spec, index) => (
                           <tr
                              key={`${spec.label}-${index}`}
                              className="border-b border-border/60 last:border-0"
                           >
                              <td className="py-2.5 pr-4 font-medium text-foreground/90">
                                 {spec.label}
                              </td>
                              <td className="py-2.5 text-muted-foreground">
                                 {spec.value}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>
         ) : null}

         {detailHtml ? (
            <section id="details" className={sectionShell(theme)}>
               <h2 className="mb-4 text-lg font-semibold">{copy.details}</h2>
               <Separator className="mb-4" />
               <div
                  className={blogProseClass(theme)}
                  dangerouslySetInnerHTML={{ __html: detailHtml }}
               />
            </section>
         ) : null}
      </div>
   )
}
