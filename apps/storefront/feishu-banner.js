// Shared Feishu Banner field parsing and DB sync (main.js + sync-client.js)

function parseBannerCategories(raw) {
   if (!raw) return []
   const str = String(raw).trim()
   if (!str) return []
   return str.split(/[,，]/).map((s) => s.trim()).filter(Boolean)
}

function mapBannerRecord(r) {
   const f = r.fields
   const clientId = String(f['客户ID'] || '').trim()
   const categories = parseBannerCategories(f['绑定分类'] || '')
   return {
      clientId,
      image: f['图片URL'] || '',
      label: f['标签名'] || '',
      order: Number(f['排序']) || 0,
      categories,
   }
}

/** 按客户ID筛选后再映射；建站/sync 必须走此函数，避免混入其他客户 Banner */
function bannerRecordsForClient(items, clientId) {
   const id = String(clientId || '').trim()
   if (!id) throw new Error('缺少客户ID，无法同步 Banner')

   return items
      .filter((r) => String(r.fields['客户ID'] || '').trim() === id)
      .map(mapBannerRecord)
}

/** 未绑定分类 → 首页 Hero 轮播；已绑定 → 仅作分类卡片封面 */
function isCarouselBanner(banner) {
   return !banner.categories?.length
}

async function ensureBannerCategories(prisma, banners) {
   const titles = new Set()
   for (const banner of banners) {
      for (const title of banner.categories || []) {
         titles.add(title)
      }
   }
   for (const title of titles) {
      await prisma.category.upsert({
         where: { title },
         update: {},
         create: { title },
      })
   }
}

async function syncBannersToDb(prisma, banners) {
   if (!banners?.length) {
      return { total: 0, carousel: 0, categoryCovers: 0 }
   }

   await ensureBannerCategories(prisma, banners)
   await prisma.banner.deleteMany()

   const sorted = [...banners].sort((a, b) => a.order - b.order)
   let carousel = 0
   let categoryCovers = 0

   for (const banner of sorted) {
      if (!banner.image) continue

      const hasCategories = banner.categories?.length > 0
      if (hasCategories) categoryCovers++
      else carousel++

      await prisma.banner.create({
         data: {
            image: banner.image,
            label: banner.label,
            ...(hasCategories
               ? {
                    categories: {
                       connect: banner.categories.map((title) => ({ title })),
                    },
                 }
               : {}),
         },
      })
   }

   return {
      total: carousel + categoryCovers,
      carousel,
      categoryCovers,
   }
}

module.exports = {
   mapBannerRecord,
   bannerRecordsForClient,
   parseBannerCategories,
   isCarouselBanner,
   syncBannersToDb,
}
