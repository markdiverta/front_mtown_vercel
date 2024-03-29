<template>
  <section class="container-fluid l-content_maxWidth-lg">
  <section class="row l-page_content-row">
  <section class="col-md-9 col-12" fluid>
  
    <div class="l-page_content">
      <div class="l-breadcum">
        <NuxtLink to="/" class="item">ホーム</nuxtlink>
        <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
        <NuxtLink :to="path" class="item">{{ news.details.group_nm }}</nuxtlink>
        <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
        <span class="item">{{ news.details.subject }}</span>
      </div>
      
      <section>
        <ArticleDetails :news="news"/>
      </section>
  
      <SocialSharing/>

      <NavNextPrev :nextPrevContent="nextPrevContent" :path="path" :apiContent="apiContent"/>

    </div>
  
  </section>
  
  <Sidebar/>
  
  </section><!--l-page_content-row-->
  </section><!--container-fluid-->
</template>

<script setup>
import { ref, onMounted } from 'vue';

//===== Global setting
const config = useRuntimeConfig(); //API route
const route = useRoute();

//===== Link function
const goTo = (url) => {
    window.location.href = url;
};


//===== Getting the category path function
const path = ref("")
const urlPath = route.path;
const catAmount = urlPath.split("/").length-1; //-1 due to none is equal to 1
const lastChar = urlPath.charAt(urlPath.length - 1);
if (catAmount > 2 && lastChar != '/') { //If there is 2 category level, then capture both
  let pathSegments = urlPath.split("/").filter(segment => segment !== '');
  path.value = `/${pathSegments[0]}/${pathSegments[1] || ''}`;
} else {
  path.value = '/' + urlPath.split("/")[1];
};


//===== Main API content
const { data: news } = await useFetch(
  `${config.public.kurocoApiDomain}/rcms-api/1/content/details/${route.params.id}`,
  // `https://dev-mtown.g.kuroco.app/rcms-api/1/content/details/${route.params.id}`,
  // `https://mtown-vercel.g.kuroco.app/rcms-api/1/content/details/${route.params.id}`,
  {
    credentials: 'include',
  }
);
var apiContent = news.value.details;


//===== Poll (Enable poll if any)
const pollAvailable = ref(false);
const pollContent = ref('');
if (apiContent && apiContent.questionnaire && apiContent.questionnaire.module_id) {
  pollAvailable.value = true;
  pollContent.value = apiContent.questionnaire;
};


//===== Next & Prev link
const { data: nextPrevContent } = await useFetch(
  `${config.public.kurocoApiDomain}/rcms-api/1/content/list?topics_group_id=` + 
  `${apiContent.topics_group_id}&contents_type=` + 
  `${apiContent.contents_type}&cnt=1&central_id=` +
  `${apiContent.topics_id}`,
  {
    credentials: 'include',
  }
);
</script>

