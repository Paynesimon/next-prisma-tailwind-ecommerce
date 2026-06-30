import { getCorporateHomeCopy } from './copy'

type Props = {
   productCount: number
   categoryCount: number
   partnerName: string
}

export function MetricsStrip({ productCount, categoryCount, partnerName }: Props) {
   const copy = getCorporateHomeCopy()

   const items = [
      { value: String(productCount), label: copy.metricProducts },
      { value: String(categoryCount), label: copy.metricCategories },
      { value: partnerName, label: copy.metricPartner },
   ]

   return (
      <section className="rounded-2xl border bg-card px-6 py-8 md:px-10">
         <p className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {copy.metricsTitle}
         </p>
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {items.map((item) => (
               <div key={item.label} className="text-center">
                  <p className="text-2xl font-semibold tracking-tight md:text-3xl">
                     {item.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
               </div>
            ))}
         </div>
      </section>
   )
}
