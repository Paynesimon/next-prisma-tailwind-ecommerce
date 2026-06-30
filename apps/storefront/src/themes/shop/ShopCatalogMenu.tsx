'use client'

import { NavMenu } from '@/components/native/nav/desktop'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getShopNavCopy } from './nav-copy'

export function ShopCatalogMenu() {
   const copy = getShopNavCopy()
   return (
      <div className="hidden lg:block">
         <NavMenu
            labels={{
               products: copy.products,
               categories: copy.categories,
               brands: copy.brands,
            }}
         />
      </div>
   )
}

export function ShopMobileCatalog() {
   const copy = getShopNavCopy()
   const [categories, setCategories] = useState<{ id: string; title: string }[]>(
      []
   )
   const [brands, setBrands] = useState<{ id: string; title: string }[]>([])

   useEffect(() => {
      fetch('/api/categories')
         .then((r) => r.json())
         .then(setCategories)
         .catch(() => [])
      fetch('/api/brands')
         .then((r) => r.json())
         .then(setBrands)
         .catch(() => [])
   }, [])

   if (!categories.length && !brands.length) return null

   return (
      <div className="mt-4 space-y-4 border-t pt-4">
         {categories.length ? (
            <div>
               <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {copy.categories}
               </p>
               <div className="flex flex-col gap-1">
                  {categories.map((c) => (
                     <Link
                        key={c.id}
                        href={`/products?category=${encodeURIComponent(c.title)}`}
                        className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                     >
                        {c.title}
                     </Link>
                  ))}
               </div>
            </div>
         ) : null}
         {brands.length ? (
            <div>
               <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {copy.brands}
               </p>
               <div className="flex flex-col gap-1">
                  {brands.map((b) => (
                     <Link
                        key={b.id}
                        href={`/products?brand=${encodeURIComponent(b.title)}`}
                        className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                     >
                        {b.title}
                     </Link>
                  ))}
               </div>
            </div>
         ) : null}
      </div>
   )
}
