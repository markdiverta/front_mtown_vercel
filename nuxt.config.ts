import { defineNuxtConfig } from 'nuxt/config';
// import generateSitemap from './sitemap';
// import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'; //Vuetify

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    // 'nuxt-gtag',
    // '@nuxtjs/sitemap',
  ],
  hooks: {
    // Run the sitemap generation script before the build process
    // 'build:before': async () => {
    //   try {
    //     // Generate the sitemap.xml file
    //     await generateSitemap();
    //   } catch (error) {
    //     console.error('Error generating sitemap:', error);
    //     process.exit(1); // Exit the process with an error code
    //   }
    // },
  },
  buildModules: ['@nuxt/router'],
  // gtag: {
  //   id: 'G-50K7BNS543',
  //   config: {
  //       anonymize_ip: true, // anonymize IP
  //       send_page_view: false // might be necessary to avoid duplicated page track on page reload
  //   },
  //   debug: true, // enable to track in dev mode
  //   disableAutoPageTrack: true, // disable if you don't want to track each page route with router.afterEach(...).
  // },
  colorMode: {
    preference: 'light'
  },
  experimental: {
    defaults: {
      nuxtLink: {
        componentName: 'NuxtLink',
        trailingSlash: 'append' // can be 'append' or 'remove'
      }
    }
  },
  ignore:  [
    // 'pages/eat/*',
  ],
  ssr: true,
  runtimeConfig: {
    public: {
      // kurocoApiDomain: 'https://api.mtown.my',
      kurocoApiDomain: 'https://dev-mtown.g.kuroco.app',
      //kurocoApiDomain: 'https://mtown-vercel.g.kuroco.app',
      // kurocoApiDomain: 'https://dev-nuxt-corporate.g.kuroco.app',
      domainName: 'https://www.mtown.my'
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
      script: [{ src: '/lightbox-plus-jquery.min.js' }],
    },
  },
  routeRules: {
    // all routes (by default) will be revalidated every 60 seconds, in the background
    '/**': { isr: 600 },
  },
  router: {
    //Prevent parameters remove automatically from the URL
    preserveQuery: true,
    // middleware: 'ipRestriction'
  },
  devtools: { enabled: true },
  css: [
    '@/assets/scss/style.scss',
  ],
});
