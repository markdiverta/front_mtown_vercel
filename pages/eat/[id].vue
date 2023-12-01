<template>
<section class="container-fluid l-content_maxWidth-lg">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

  <div class="l-page_content">

    <div class="l-container--col-2 l-container--contents">
      <div class="l-container--col-2__main">
        <article class="c-article">
          <header>
            <h1 class="c-heading--lv1">
              {{ news.details.subject }}
            </h1>
            <time class="c-topics__date" :datetime="news.details.ymd">{{
              news.details.ymd
            }}</time>
            <span class="c-badge">
              {{ news.details.contents_type_nm }}
            </span>
          </header>
          <div class="l-container--contents">
            <div v-html="news.details.contents"></div>
          </div>

          <hr />
          <div class="l-container--contents u-pt-30 u-text-align-center">
            <NuxtLink :to="'/news/'" class="c-button">
              ニュースリリース一覧へ戻る
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>

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
