export interface BrandNavItem {
  label: string
  to: string
  newTab?: boolean
  external?: boolean
}

export interface BrandConfig {
  siteName: string
  siteUrl: string
  description: string
  ogImage: string
  copyright: string
  logo: {
    default: string
    white: string
  }
  sns: {
    youtube: string
    x: string
    xHandle: string
  }
  news: {
    apiPrefix: string
  }
  loading: {
    bgIcon: string
    innerBg: string
    defaultImage: string
  }
  nav: {
    main: BrandNavItem[]
    sub: BrandNavItem[]
    footer: BrandNavItem[]
  }
  contact: {
    endpoint: string
    productionName: string
    routes: {
      contactComplete: string
      contactError: string
      downloadComplete: string
      downloadError: string
    }
  }
}

declare module 'nuxt/schema' {
  interface AppConfigInput {
    brand: BrandConfig
  }
}
