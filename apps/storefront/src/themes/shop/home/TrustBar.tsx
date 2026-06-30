import { Award, Headphones, ShieldCheck, Truck } from 'lucide-react'

import { getHomeCopy } from './copy'

const ICONS = [ShieldCheck, Truck, Headphones, Award]

export function TrustBar() {
   const { trust } = getHomeCopy()

   return (
      <section className="rounded-xl border bg-card/60 p-4 shadow-sm backdrop-blur md:p-6">
         <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
            {trust.title}
         </p>
         <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {trust.items.map((item, index) => {
               const Icon = ICONS[index]
               return (
                  <div
                     key={item.title}
                     className="flex flex-col items-center gap-2 text-center md:items-start md:text-left"
                  >
                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                     </div>
                  </div>
               )
            })}
         </div>
      </section>
   )
}
