import { fileURLToPath } from 'node:url'

// Trial repo: `@core` points at this app until `packages/core` exists in the vhs-city monorepo.
const CORE_APP_DIR = fileURLToPath(new URL('./app', import.meta.url))
const APP_BASE_URL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2026-04-10',
  devtools: { enabled: true },

  app: {
    baseURL: APP_BASE_URL,
    head: {
      htmlAttrs: { lang: 'ja' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
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

  runtimeConfig: {
    microCmsApiKey: '',
    // Build-time: SITE_* or NUXT_SITE_*. Runtime overlay (Nitro): NUXT_SITE_* only.
    siteUser: process.env.NUXT_SITE_USER || process.env.SITE_USER || '',
    sitePassword: process.env.NUXT_SITE_PASSWORD || process.env.SITE_PASSWORD || '',
    public: {
      apiBaseUrl: '',
      parentSiteUrl: '',
      microCmsServiceDomain: '',
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
