import { defineNuxtConfig } from 'nuxt/config';
// import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'; //Vuetify

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    'nuxt-gtag',
  ],
  gtag: {
    id: 'G-50K7BNS543',
    config: {
        anonymize_ip: true, // anonymize IP
        send_page_view: false // might be necessary to avoid duplicated page track on page reload
    },
    debug: true, // enable to track in dev mode
    disableAutoPageTrack: true, // disable if you don't want to track each page route with router.afterEach(...).
  },
  colorMode: {
    preference: 'light'
  },
  ignore:  [
    // 'pages/eat/*',
  ],
  ssr: true,
  runtimeConfig: {
    public: {
      kurocoApiDomain: 'https://api.mtown.my',
      // kurocoApiDomain: 'https://mtown-vercel.g.kuroco.app',
      // kurocoApiDomain: 'https://dev-nuxt-corporate.g.kuroco.app',
    },
  },
  app: {
    head: {
      title: 'MTown - マレーシアの週刊情報誌',
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'マレーシアの週刊情報誌MtownのWEBサイト。マレーシアライフをもっと楽しく豊かに、をコンセプトに、在留邦人や短期滞在者、またマレーシアに興味がある方に、実用的で生活に役立つ情報を提供しています。' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  routeRules: {
    // all routes (by default) will be revalidated every 60 seconds, in the background
    '/**': { isr: 60 }
  },

  devtools: { enabled: true },
  css: ['@/assets/scss/style.scss'],
});
