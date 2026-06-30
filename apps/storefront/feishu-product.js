// Shared Feishu product field parsing for main.js and sync-client.js

function parsePriceTiers(raw) {
   if (!raw || typeof raw !== 'string') return []
   return raw
      .split(/[,，\n]/)
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
         const [qtyRaw, priceRaw] = part.split(/[:：]/)
         const qty = parseInt(String(qtyRaw).trim(), 10)
         const price = parseFloat(String(priceRaw).trim())
         if (!Number.isFinite(qty) || !Number.isFinite(price)) return null
         if (qty <= 0 || price <= 0) return null
         return { qty, price }
      })
      .filter(Boolean)
}

function productMetadataFromFields(f) {
   const moq = parseInt(f['起订量'], 10)
   const priceTiers = parsePriceTiers(f['批次价格'] || '')
   const metadata = {}
   if (Number.isFinite(moq) && moq > 0) metadata.moq = moq
   if (priceTiers.length) metadata.priceTiers = priceTiers
   return Object.keys(metadata).length ? metadata : undefined
}

function mapProductRecord(r) {
   const f = r.fields
   const metadata = productMetadataFromFields(f)
   return {
      title: f['商品名称'] || '',
      brand: f['品牌'] || '',
      price: parseFloat(f['价格']) || 0,
      description: f['商品描述'] || '',
      images: [f['图片URL'] || ''],
      categories: f['分类'] ? f['分类'].split(',').map((c) => c.trim()) : [],
      keywords: f['关键词'] ? f['关键词'].split(',').map((k) => k.trim()) : [],
      isAvailable: f['是否上架'] ?? true,
      ...(metadata ? { metadata } : {}),
   }
}

function normalizeTheme(value) {
   const raw = String(value || 'shop')
      .trim()
      .toLowerCase()
   if (['shop', 'corporate', 'blog'].includes(raw)) return raw
   return 'shop'
}

module.exports = {
   mapProductRecord,
   normalizeTheme,
   productMetadataFromFields,
}
