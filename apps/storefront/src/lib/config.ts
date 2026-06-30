import configData from '../../config.json'

export interface StoreConfig {
   name: string
   description: string
   tagline: string
   brandStory: string
   creator: string
   keywords: string[]
   contactEmail?: string
   whatsappLink?: string
   telegramLink?: string
   instagramLink?: string
   twitterLink?: string
   facebookLink?: string
   linkedinLink?: string
   tiktokLink?: string
   faq?: string
}

export interface LocaleConfig {
   language: string
   region: string
   currency: string
   timezone: string
   countryCode: string
   taxRate: number
}

export interface SiteFeatures {
   productReviews?: boolean
   blogComments?: boolean
   contactMessages?: boolean
}

export interface Config {
   locale?: LocaleConfig
   theme?: 'shop' | 'corporate' | 'blog'
   features?: SiteFeatures
   store: StoreConfig
   products: any[]
   banners: any[]
}

export const config = configData as Config
