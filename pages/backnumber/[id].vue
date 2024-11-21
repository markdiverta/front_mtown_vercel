<template>
  <section class="container-fluid l-content_maxWidth-lg">
  <section class="row l-page_content-row">
  <section class="col-md-9 col-12" fluid>
  
    <div class="l-page_content">
      <div class="l-breadcum">
        <NuxtLink to="/" class="item">ホーム</nuxtlink>
        <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
        <NuxtLink :to="path" class="item">バックナンバー</nuxtlink>
        <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
        <span class="item">{{ pageTitle }}</span>
      </div>
      
      <section>

        <client-only>
          <section class="p-article_wrap">
              <h1 class="p-heading mb-3">{{ pageTitle }}</h1>
              <span class="c-btn c-btn_main c-btn_sm c-btn_disable">{{ items.category }}</span>
             
              <div class="row p-article_imgList l-content_padding">
                  <div v-for="(image, imageIndex) in items.img" :key="imageIndex" class="col-md-4 col-sm-6 col-12 p-2">
                  <a :href="image" data-lightbox="example-set">
                  <img
                      class="image"
                      :src="(image?.url || image) + '?width=250'"
                  >
                  </a>
                  </div>
              </div>
           </section>

        </client-only>

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
const catSlug = '/comics'; //Manual specific cat name due to this cat technically not under column in Kuroco backend
var pageTitle;

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
  {
    credentials: 'include',
  }
);
const items = ref('');
var apiContent = news.value.details;
console.log('hi');
console.log(apiContent);
if (apiContent) {
  let content = apiContent;
  let item = [];
  
  if (content.ext_1) {
      item.img = content.ext_1;
  };
  item.category = content.contents_type_nm;
  item.title = content.subject;
  pageTitle = content.subject;
  item.date = content.ymd
      .substring(0, 10)
      .replaceAll('-', '.');
  
  items.value = item;
};

console.log('end');
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

//===== Custom Meta & formatted Title
if (items.value) {
  let content = items.value;
  if (content.date) {
    var date = content.date ? content.date : '';
    var formattedDate = date.replace(/\./g, (match, index) => {
      return index === 4 ? '年' : index === 7 ? '月' : '年';
    }) + '日号';
    pageTitle = formattedDate + ' vol.' + content.title;
    var pageDesc = `マレーシアMTown(エムタウン)の紙面バックナンバー。${formattedDate} vol.${content.title}をEbookで読めます。`;

    useHead({
      title: pageTitle,
      meta: [
          {
              hid: 'og:title',
              property: 'og:title',
              content: pageTitle
          },
          {
              hid: 'og:description',
              property: 'og:description',
              content: pageDesc
          },
          {
              hid: 'description',
              name: 'description',
              content: pageDesc
          }
      ]
    });
  }
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/css/lightbox.css');
</style>