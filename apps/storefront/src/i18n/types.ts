export type SupportedLocale = 'en' | 'zh-CN' | 'ja' | 'ru' | 'es' | 'pt' | 'ar'

export type TrustItem = { title: string; desc: string }

export type Messages = {
   common: {
      home: string
      products: string
      blog: string
      about: string
      contact: string
      login: string
      cart: string
      brand: string
      categories: string
      rights: string
      soldCount: string
      categoryCount: string
   }
   shop: {
      nav: {
         shopNow: string
         menu: string
         categories: string
         brands: string
         footerShop: string
         footerSupport: string
         footerLegal: string
         footerFollow: string
         privacy: string
         terms: string
         faq: string
         telegram: string
      }
      home: {
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
         trust: { title: string; items: TrustItem[] }
      }
   }
   corporate: {
      nav: {
         contactCta: string
         menu: string
         footerTagline: string
         footerCompany: string
         footerCatalog: string
         footerConnect: string
         footerLegal: string
         privacy: string
         terms: string
         faq: string
         telegram: string
         newsletterTitle: string
         newsletterDesc: string
         newsletterPlaceholder: string
         newsletterSubmit: string
         newsletterSuccess: string
         newsletterError: string
         blog: string
      }
      home: {
         contactUs: string
         viewCatalog: string
         learnMore: string
         metricsTitle: string
         metricProducts: string
         metricCategories: string
         metricPartner: string
         aboutTitle: string
         aboutDesc: string
         solutionsTitle: string
         solutionsDesc: string
         explore: string
         productsTitle: string
         productsDesc: string
         viewAll: string
         insightsTitle: string
         insightsDesc: string
         ctaTitle: string
         ctaDesc: string
         ctaContact: string
         ctaCatalog: string
      }
   }
   blog: {
      nav: {
         menu: string
         readMore: string
         latestPosts: string
         featured: string
         shopPicks: string
         viewAllPosts: string
         viewCatalog: string
         footerExplore: string
         footerStore: string
         products: string
         rights: string
      }
   }
   cart: {
      title: string
      description: string
      empty: string
      receipt: string
      total: string
      discount: string
      tax: string
      payable: string
      checkout: string
      checkoutLoading: string
      continueShopping: string
      trustNote: string
   }
   feedback: {
      contactTitle: string
      contactDesc: string
      name: string
      email: string
      phone: string
      subject: string
      message: string
      submit: string
      submitting: string
      success: string
      error: string
      reviewsTitle: string
      reviewsEmpty: string
      writeReview: string
      rating: string
      reviewText: string
      reviewSubmit: string
      reviewPending: string
      reviewLogin: string
      reviewPurchaseRequired: string
      reviewAlready: string
      verifiedPurchase: string
      commentsTitle: string
      commentsEmpty: string
      commentName: string
      commentEmail: string
      commentText: string
      commentSubmit: string
      commentPending: string
      inquiryTitle: string
      inquirySubmit: string
   }
   product: {
      overview: string
      specs: string
      details: string
      specLabel: string
      specValue: string
      moqLabel: string
      moqBelow: string
      moqBelowNamed: string
      priceTiersTitle: string
      priceTiersQty: string
      priceTiersPrice: string
   }
   wholesale: {
      title: string
      hint: string
      email: string
      whatsapp: string
   }
   pages: {
      productsTitle: string
      productsDesc: string
      blogTitle: string
      blogDesc: string
   }
}
