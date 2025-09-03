// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Бот ферма',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  alias: {
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
