import { config } from './config'

export type SiteFeature = 'productReviews' | 'blogComments' | 'contactMessages'

export type SiteFeatures = {
   productReviews?: boolean
   blogComments?: boolean
   contactMessages?: boolean
}

const DEFAULTS: Record<SiteFeature, boolean> = {
   productReviews: true,
   blogComments: true,
   contactMessages: true,
}

export function getSiteFeatures(): SiteFeatures {
   return (config as { features?: SiteFeatures }).features || {}
}

export function isFeatureEnabled(feature: SiteFeature): boolean {
   const features = getSiteFeatures()
   return features[feature] ?? DEFAULTS[feature]
}
