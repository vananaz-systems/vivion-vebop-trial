import { fileURLToPath } from 'node:url'

// Trial repo: `@core` points at this app until `packages/core` exists in the vhs-city monorepo.
const CORE_APP_DIR = fileURLToPath(new URL('./app', import.meta.url))
const APP_BASE_URL = process.env.NUXT_APP_BASE_URL || '/'
const IS_GENERATE = process.argv.includes('generate')
  || process.env.npm_lifecycle_event?.startsWith('generate')

interface CmsRouteItem {
  id: string
  slug?: string
}

interface CmsListResponse<T> {
  contents: T[]
  totalCount: number
}

async function fetchAllCmsRouteItems(endpoint: string): Promise<CmsRouteItem[]> {
  const origin = (process.env.NUXT_PUBLIC_API_BASE_URL || '').replace(/\/+$/, '')
  const apiKey = process.env.NUXT_MICROCMS_API_KEY || ''

  if (!origin || !apiKey) {
    throw new Error(
      'CMS route discovery requires NUXT_PUBLIC_API_BASE_URL and NUXT_MICROCMS_API_KEY',
    )
  }

  const contents: CmsRouteItem[] = []
  let offset = 0
  let totalCount = 0

  do {
    const url = new URL(`${origin}/api/v1/${endpoint}`)
    url.searchParams.set('fields', 'id,slug')
    url.searchParams.set('limit', '100')
    url.searchParams.set('offset', String(offset))

    const response = await fetch(url, {
      headers: { 'X-MICROCMS-API-KEY': apiKey },
    })

    if (!response.ok) {
      throw new Error(`microCMS ${endpoint} discovery failed (${response.status})`)
    }

    const page = await response.json() as CmsListResponse<CmsRouteItem>
    contents.push(...page.contents)
    totalCount = page.totalCount
    offset += page.contents.length

    if (page.contents.length === 0) break
  } while (offset < totalCount)

  return contents
}

async function generateCmsRoutes(): Promise<string[]> {
  const [topics, talents, units, tags] = await Promise.all([
    fetchAllCmsRouteItems('vebop-topics'),
    fetchAllCmsRouteItems('vebop-talents'),
    fetchAllCmsRouteItems('vebop-units'),
    fetchAllCmsRouteItems('vebop-tags'),
  ])

  const routes = [
    ...topics.map(item => `/topics/${encodeURIComponent(item.id)}/`),
    ...talents
      .filter(item => item.slug)
      .map(item => `/talents/${encodeURIComponent(item.slug!)}/`),
    ...units
      .filter(item => item.slug)
      .map(item => `/talents/unit/${encodeURIComponent(item.slug!)}/`),
    ...tags
      .filter(item => item.slug)
      .map(item => `/tag/${encodeURIComponent(item.slug!)}/`),
  ]

  return [...new Set(routes)]
}

// `app.head` is not rewritten by `baseURL`, so build public asset paths here.
const asset = (path: string) => `${APP_BASE_URL.replace(/\/$/, '')}/${path}`

// Official markup busts the icon cache with a dated query.
const ICON_VERSION = '20260601'

export default defineNuxtConfig({
  compatibilityDate: '2026-04-10',
  devtools: { enabled: true },

  app: {
    baseURL: APP_BASE_URL,
    head: {
      htmlAttrs: { lang: 'ja' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'theme-color', content: '#000000' },
      ],
      link: [
        { rel: 'icon', href: asset(`favicon.ico?v=${ICON_VERSION}`), sizes: 'any' },
        { rel: 'apple-touch-icon', href: asset(`apple-touch-icon.png?v=${ICON_VERSION}`) },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=IBM+Plex+Sans+JP:wght@400;500;600;700&family=Noto+Sans+JP:wght@100..900&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/clash-display.css', '~/assets/scss/main.scss'],

  routeRules: {
    '/privacy/**': { redirect: { to: 'https://vivion.jp/privacy_protection/', statusCode: 301 } },
    '/contact/**': { redirect: { to: 'https://vebop.zendesk.com/hc/ja/requests/new', statusCode: 301 } },
  },

  runtimeConfig: {
    microcmsApiKey: '',
    // Build-time: SITE_* or NUXT_SITE_*. Runtime overlay (Nitro): NUXT_SITE_* only.
    siteUser: process.env.NUXT_SITE_USER || process.env.SITE_USER || '',
    sitePassword: process.env.NUXT_SITE_PASSWORD || process.env.SITE_PASSWORD || '',
    public: {
      apiBaseUrl: '',
      parentSiteUrl: '',
      gtag: {
        id: '',
      },
    },
  },

  // When this app lands in the vhs-city monorepo, also scan
  // `${packages/core/app}/components` here — passing an array replaces
  // Nuxt's default `~/components` auto-scan.
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  alias: {
    '@core': CORE_APP_DIR,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },

  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (!IS_GENERATE) return

      const cmsRoutes = await generateCmsRoutes()
      nitroConfig.prerender ||= {}
      nitroConfig.prerender.routes ||= []
      nitroConfig.prerender.routes.push(...cmsRoutes)
    },
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    },
    resolve: {
      alias: [
        { find: '@core', replacement: CORE_APP_DIR },
        {
          find: /^~\/assets\/scss(\/|$)/,
          replacement: `${CORE_APP_DIR}/assets/scss$1`,
        },
      ],
    },
  },
})
