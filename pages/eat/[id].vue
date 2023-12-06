<template>
  <section class="container-fluid l-content_maxWidth-lg">
  <section class="row l-page_content-row">
  <section class="col-md-9 col-12" fluid>
  
    <div class="l-page_content">
      <div class="l-breadcum">
        <a href="/" class="item">ホーム</a>
        <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
        <a :href="path" class="item">{{ news.details.group_nm }}</a>
        <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
        <span class="item">{{ news.details.subject }}</span>
      </div>
      
      <section>
        <section class="p-article_wrap">
          <div class="p-article_featureIMG">
            <img v-if="news.details.ext_1" :src="news.details.ext_1" width="620" height="413">
          </div>
          <h1 class="p-heading mb-3">{{ news.details.subject }}</h1>
          {{ formattedDate }} <span class="c-btn c-btn_main c-btn_sm c-btn_disable ml-4">{{ news.details.contents_type_nm }}</span>
          <div class="p-article_content" v-if="news.details.contents" v-html="news.details.contents"></div>
          </section>
      </section>
  
      <SocialSharing/>
  
    </div>
  
  </section>
  
  <Sidebar/>
  
  </section><!--l-page_content-row-->
  </section><!--container-fluid-->
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  //Global setting
  const config = useRuntimeConfig(); //API route
  const route = useRoute();
  
  //Meta variables
  const metaDesc = ref('');
  
  const { data: news } = await useFetch(
    // `${config.public.kurocoApiDomain}/rcms-api/1/news/details/${route.params.id}`,
    // `https://dev-nuxt-corporate.g.kuroco.app/rcms-api/1/news/details/${route.params.id}`,
    `${config.public.kurocoApiDomain}/rcms-api/1/content/details/${route.params.id}`,
    {
      credentials: 'include',
    }
  );
  
  //Date format
  const formattedDate = ref('');
  
  if (news.value.details && news.value.details.ymd) {
    const rawDate = news.value.details.ymd;
    formattedDate.value = rawDate.substring(0, 10).replaceAll('-', '.');
  }
  
  const { data: newsConditionMaster } = await useFetch(
    // `${config.public.kurocoApiDomain}/rcms-api/1/master`,
    'https://dev-nuxt-corporate.g.kuroco.app/rcms-api/1/master',
    {
      credentials: 'include',
    }
  );
  
  //API content assigned
  const apiContent = news.value.details;
  const title = apiContent.subject;
  
  // Shorten meta description
  if (apiContent.contents) {
    let description = apiContent.contents.replace(/<[^>]+>/g, '').replace(/[\r\n]+/g, '');
    if (description.length > 120) {
      description = description.substring(0, 120) + '...';
    }
    metaDesc.value = description;
  };
  
  //Head & meta setting
  useHead({
    title,
    meta: [{
      name: 'description',
      content: metaDesc.value
    }]
  });
  
  </script>
  