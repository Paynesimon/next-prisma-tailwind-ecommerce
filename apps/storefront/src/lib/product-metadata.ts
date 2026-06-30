export type PriceTier = {
   qty: number
   price: number
}

export type ProductSpec = {
   label: string
   value: string
}

export type ProductMetadata = {
   moq?: number
   priceTiers?: PriceTier[]
   specs?: ProductSpec[]
   detailHtml?: string
}

function parseSpecs(raw: unknown): ProductSpec[] | undefined {
   if (!Array.isArray(raw)) return undefined

   const specs = raw
      .map((item) => {
         if (!item || typeof item !== 'object') return null
         const row = item as Record<string, unknown>
         const label = String(row.label ?? '').trim()
         const value = String(row.value ?? '').trim()
         if (!label || !value) return null
         return { label, value }
      })
      .filter((item): item is ProductSpec => item !== null)

   return specs.length ? specs : undefined
}

export function sanitizeProductHtml(html: string): string {
   return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      .replace(/javascript:/gi, '')
}

export function parseProductMetadata(raw: unknown): ProductMetadata {
   if (!raw || typeof raw !== 'object') return {}
   const data = raw as Record<string, unknown>

   const moq =
      typeof data.moq === 'number' && data.moq > 0 ? data.moq : undefined

   const priceTiers = Array.isArray(data.priceTiers)
      ? data.priceTiers
           .map((tier) => {
              if (!tier || typeof tier !== 'object') return null
              const t = tier as Record<string, unknown>
              const qty = Number(t.qty)
              const price = Number(t.price)
              if (!Number.isFinite(qty) || !Number.isFinite(price)) return null
              if (qty <= 0 || price <= 0) return null
              return { qty, price }
           })
           .filter((tier): tier is PriceTier => tier !== null)
      : undefined

   const specs = parseSpecs(data.specs)

   const detailHtml =
      typeof data.detailHtml === 'string' && data.detailHtml.trim()
         ? sanitizeProductHtml(data.detailHtml.trim())
         : undefined

   return {
      ...(moq ? { moq } : {}),
      ...(priceTiers?.length ? { priceTiers } : {}),
      ...(specs?.length ? { specs } : {}),
      ...(detailHtml ? { detailHtml } : {}),
   }
}
