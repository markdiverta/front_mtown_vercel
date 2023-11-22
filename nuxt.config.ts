import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      // kurocoApiDomain: 'https://mtown-vercel.g.kuroco.app',
      kurocoApiDomain: 'https://dev-nuxt-corporate.g.kuroco.app',
    },
  },
  app: {
    head: {
      title: 'front_nuxt_corporate',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
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

  // nitro: {
  //   // FullStaticGeneration
  //   prerender: {
  //     crawlLinks: true,
  //     routes: ['/', '/404.html', '/200.html'],
  //   },
  // },
  
  // generate: {
  //   routes: async () => {
  //         console.log('Fetching data...');
  //         const apiDomain = 'https://dev-mtown.g.kuroco.app'; //For localhost, avoid it use localhost:3000 as api domain
  //         const apiContent = apiDomain + '/rcms-api/1/content/details/47640';
  //         const responseContent = await axios.get(apiContent);
  //         const finalContent = responseContent.data.list;
  //         const testing = "testing description content 123"
      
  //         routes.push({
  //             route: '/news/politics',
  //             payload: {
  //               testing
  //             }
  //         });

  //       return routes
  //   },
  //   interval: 60 // Regenerate every 60 second
  // },
});
