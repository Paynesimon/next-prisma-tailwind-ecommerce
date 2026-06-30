import { config } from '@/lib/config'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { SHELL_X } from '@/themes/shared/theme-styles'

import { getBlogNavCopy } from './nav-copy'

export function BlogFooter() {
   const copy = getBlogNavCopy()
   const year = new Date().getFullYear()

   return (
      <footer className="mt-16 border-t">
         <div className={cn(SHELL_X, 'py-10')}>
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
               <div className="max-w-sm space-y-2">
                  <p className="font-serif text-lg font-semibold">
                     {config.store.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                     {config.store.description}
                  </p>
               </div>
               <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
                  <div>
                     <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {copy.footerExplore}
                     </p>
                     <ul className="space-y-1.5">
                        <li>
                           <Link href="/blog" className="hover:underline">
                              {copy.blog}
                           </Link>
                        </li>
                        <li>
                           <Link href="/about" className="hover:underline">
                              {copy.about}
                           </Link>
                        </li>
                        <li>
                           <Link href="/contact" className="hover:underline">
                              {copy.contact}
                           </Link>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {copy.footerStore}
                     </p>
                     <ul className="space-y-1.5">
                        <li>
                           <Link href="/products" className="hover:underline">
                              {copy.products}
                           </Link>
                        </li>
                        <li>
                           <Link href="/cart" className="hover:underline">
                              Cart
                           </Link>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <p className="mt-8 border-t pt-6 text-xs text-muted-foreground">
               {copy.rights(year, config.store.name)}
            </p>
         </div>
      </footer>
   )
}
