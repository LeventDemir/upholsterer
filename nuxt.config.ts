// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-mongoose'],
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI
  },
  mongoose: {
    uri: process.env.MONGODB_URI
  },
  routeRules: {
    '/api/*': {},
  },
  app: {
    head: {
      title: 'Muğla Döşeme | Yatağan Yat, Koltuk, Araç ve Tekne Döşeme - Yıldırım Döşeme',
      htmlAttrs: {
        lang: 'tr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Muğla Yatağan\'da Yıldırım Döşeme olarak yat döşeme, koltuk döşeme, araç döşeme, tekne döşeme ve kamyon döşeme hizmetleri sunuyoruz. Kaliteli işçilik ve uygun fiyat avantajıyla Muğla\'da döşeme ihtiyaçlarınız için bize ulaşın.'
        },
        { name: 'keywords', content: 'muğla döşeme, yatağan döşeme, yat döşeme, koltuk döşeme, araç döşeme, tekne döşeme, kamyon döşeme, muğla koltuk döşeme, muğla yat döşeme, muğla tekne döşeme, muğla gemi döşeme,' },
        { name: 'format-detection', content: 'telephone=no' },

        // Open Graph
        { property: 'og:title', content: 'Muğla Döşeme | Yatağan Yat, Koltuk, Araç ve Tekne Döşeme - Yıldırım Döşeme' },
        { property: 'og:description', content: 'Muğla ve Yatağan bölgesinde yat, koltuk, araç, tekne ve kamyon döşeme hizmetleri sunuyoruz. Hemen fiyat alın.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.sitendomain.com' }, // gerçek domaini yaz
        { property: 'og:image', content: '/yat-doseme-mugla.jpg' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Muğla Döşeme | Yatağan Yat, Koltuk, Araç ve Tekne Döşeme' },
        { name: 'twitter:description', content: 'Muğla Yatağan Yıldırım Döşeme olarak yat döşeme, koltuk döşeme, araç döşeme hizmeti sunuyoruz.' },
        { name: 'twitter:image', content: '/yat-doseme-mugla.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ]
    }

  }
})