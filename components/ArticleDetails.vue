<template>
    <section class="p-article_wrap">

          <template v-if="headingTop">
            <h1 class="p-heading mb-3">{{ news.details.subject }}</h1>
            {{ formattedDate }} <span class="c-btn c-btn_main c-btn_sm c-btn_disable ml-4">{{ news.details.contents_type_nm }}</span>
          </template>

          <div class="p-article_featureIMG">
            <img v-if="news.details.ext_1" :alt="news.details.subject" :src="news.details.ext_1 + '?width=650'" width="620" height="413">
          </div>

          <template v-if="!headingTop">
            <h1 class="p-heading mb-3">{{ news.details.subject }}</h1>
            {{ formattedDate }} <span class="c-btn c-btn_main c-btn_sm c-btn_disable ml-4">{{ news.details.contents_type_nm }}</span>
          </template>

          <div class="p-article_content" v-if="news.details.contents" v-html="news.details.contents"></div>
    </section>
</template>

<script setup>
//Global setting
const config = useRuntimeConfig(); //API route
import { useRouter } from 'vue-router';
const router = useRouter();
import { onMounted } from 'vue';

//Props
const props = defineProps(['news', 'headingTop']);
const news = props.news;
const headingTop = props.headingTop;  //This parameter to change layout to heading at top for page like comics & malaysia-profiles

//Date format
const formattedDate = ref('');
if (news.details && news.details.ymd) {
  const rawDate = news.details.ymd;
  formattedDate.value = rawDate.substring(0, 10).replaceAll('-', '.');
}

//API content assigned
const apiContent = news.details;
const title = apiContent.subject;

//Meta variables
const metaDesc = ref('');
const metaOGImg = news.details.ext_1 ? news.details.ext_1 : '';

// Shorten meta description
if (apiContent.contents) {
  let description = apiContent.contents.replace(/<[^>]+>/g, '').replace(/[\r\n]+/g, '');
  if (description.length > 120) {
    description = description.substring(0, 120) + '...';
  }
  metaDesc.value = description;
};

const currentURL = process.client ? window.location.href : '';
//Head & meta setting
useHead({
  title,
  link: [
    {
      rel: 'canonical',
      href: currentURL,
    },
  ],
  meta: [
  {
    hid: 'og:title',
    property: 'og:title',
    content: title
  },
  {
    name: 'description',
    content: metaDesc.value
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content: metaDesc.value
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: metaOGImg
  },
  {
    hid: 'og:image:secure_url',
    property: 'og:image:secure_url',
    content: metaOGImg
  },
  {
    hid: 'og:image:url',
    property: 'og:image:url',
    content: metaOGImg
  },
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image'
  },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: title
  },
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content: metaDesc.value
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: metaOGImg
  },
  ]
});

//GA4 Custom Dimension setup
// if (process.browser) {
//     var slug = this.GAslug ? this.GAslug : this.$route.params.id;
//     this.$gtag('event', 'page_view', {
//         'detail_page_slug': slug
        
//     })
// };

const { gtag } = useGtag();
const slug = router.currentRoute.value.params.id ? router.currentRoute.value.params.id : router.currentRoute.value.path;
gtag('event', 'page_view', {
  'detail_page_slug': slug
});

// GA4 custom dimension
// onMounted(() => {  
//   var slug = router.currentRoute.value.params.id ? router.currentRoute.value.params.id : router.currentRoute.value.path;
//   this.$gtag.set('event', 'page_view', {
//       'detail_page_slug': slug
      
//   });
// });
</script>
