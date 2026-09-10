import type { RouterConfig } from '@nuxt/schema'

export default {
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash === '#About' || to.hash === '#about') {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    if (savedPosition) {
      return savedPosition
    }

    return { top: 0 }
  },
} satisfies RouterConfig
