export type PriceTier = {
   qty: number
   price: number
}

export type ProductMetadata = {
   moq?: number
   priceTiers?: PriceTier[]
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

   return {
      ...(moq ? { moq } : {}),
      ...(priceTiers?.length ? { priceTiers } : {}),
   }
}
