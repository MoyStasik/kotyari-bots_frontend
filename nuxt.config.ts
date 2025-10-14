// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Бот ферма',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },

  modules: [
    'nuxt-viewport',
    'nuxt-lucide-icons',
    '@nuxt/eslint',
    '@pinia/nuxt'
  ],

  viewport: {
    breakpoints: {
      desktop: 1200,
      desktopWide: 1600,

      mobile: 320,
      mobileMedium: 375,

      tablet: 768,
    },

    cookie: {
      expires: 365,
      name: 'viewport',
      path: '/',
      sameSite: 'Strict',
      secure: true,
    },

    defaultBreakpoints: {
      desktop: 'desktop',
      mobile: 'mobile',
      tablet: 'tablet',
    },

    fallbackBreakpoint: 'desktop',
  },

  css: [
    '~/assets/styles/tokens.scss',
    '~/assets/styles/styles.scss',
  ],

  vite: {
  },

  alias: {
  },

  routeRules: {
    '/api/v1/**': { proxy: 'localhost:8001/api/v1/**' },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
});
