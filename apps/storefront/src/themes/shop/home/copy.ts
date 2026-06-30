import { getLocale } from '@/lib/locale'

type HomeCopy = {
   shopNow: string
   learnMore: string
   viewAll: string
   featuredTitle: string
   featuredDesc: string
   categoriesTitle: string
   categoriesDesc: string
   brandTitle: string
   readStory: string
   blogTitle: string
   blogDesc: string
   formatCategoryCount: (count: number) => string
   trust: { title: string; items: { title: string; desc: string }[] }
}

const COPY: Record<string, HomeCopy> = {
   en: {
      shopNow: 'Shop now',
      learnMore: 'Our story',
      viewAll: 'View all',
      featuredTitle: 'Featured products',
      featuredDesc: 'Hand-picked items from our catalog',
      categoriesTitle: 'Shop by category',
      categoriesDesc: 'Browse collections that match your needs',
      brandTitle: 'Why shop with us',
      readStory: 'Read our story',
      blogTitle: 'From the blog',
      blogDesc: 'Tips, stories, and updates from our team',
      formatCategoryCount: (count) => `${count} items`,
      trust: {
         title: 'Shop with confidence',
         items: [
            { title: 'Secure checkout', desc: 'Encrypted payments via Stripe' },
            { title: 'Fast shipping', desc: 'Reliable delivery to your door' },
            { title: 'Expert support', desc: 'We reply within one business day' },
            { title: 'Quality assured', desc: 'Curated products you can trust' },
         ],
      },
   },
   zh: {
      shopNow: '立即选购',
      learnMore: '了解品牌',
      viewAll: '查看全部',
      featuredTitle: '精选商品',
      featuredDesc: '为你精心挑选的热门好物',
      categoriesTitle: '按分类浏览',
      categoriesDesc: '快速找到你需要的系列',
      brandTitle: '为什么选择我们',
      readStory: '阅读品牌故事',
      blogTitle: '博客精选',
      blogDesc: '来自团队的分享与更新',
      formatCategoryCount: (count) => `${count} 件商品`,
      trust: {
         title: '放心购物',
         items: [
            { title: '安全支付', desc: 'Stripe 加密结账' },
            { title: '快速发货', desc: '稳定物流直达' },
            { title: '专业客服', desc: '工作日 24 小时内回复' },
            { title: '品质保障', desc: '严选商品，值得信赖' },
         ],
      },
   },
   ja: {
      shopNow: '今すぐ購入',
      learnMore: 'ブランドについて',
      viewAll: 'すべて見る',
      featuredTitle: 'おすすめ商品',
      featuredDesc: '厳選された人気アイテム',
      categoriesTitle: 'カテゴリーから探す',
      categoriesDesc: '目的に合ったコレクションを見る',
      brandTitle: '選ばれる理由',
      readStory: 'ストーリーを読む',
      blogTitle: 'ブログ',
      blogDesc: 'チームからの最新情報',
      formatCategoryCount: (count) => `${count} 点`,
      trust: {
         title: '安心してお買い物',
         items: [
            { title: '安全な決済', desc: 'Stripe による暗号化決済' },
            { title: '迅速な配送', desc: '信頼できるお届け' },
            { title: 'サポート', desc: '1営業日以内に返信' },
            { title: '品質保証', desc: '厳選された商品' },
         ],
      },
   },
}

export function getHomeCopy(): HomeCopy {
   const lang = getLocale().language
   return COPY[lang] || COPY[lang.split('-')[0]] || COPY.en
}
