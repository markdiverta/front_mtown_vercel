<template>
    <section class="p-article_wrap">
          <div class="p-article_featureIMG">
            <img v-if="news.details.ext_1" :src="news.details.ext_1" width="620" height="413">
          </div>
          <h1 class="p-heading mb-3">{{ news.details.subject }}</h1>
          {{ formattedDate }} <span class="c-btn c-btn_main c-btn_sm c-btn_disable ml-4">{{ news.details.contents_type_nm }}</span>
          <div class="p-article_content" v-if="news.details.contents" v-html="news.details.contents"></div>
    </section>
</template>

<script setup>
const props = defineProps(['news']);
const news = props.news;

//Date format
const formattedDate = ref('');
if (news.details && news.details.ymd) {
  const rawDate = news.details.ymd;
  formattedDate.value = rawDate.substring(0, 10).replaceAll('-', '.');
}

//Meta variables
const metaDesc = ref('');

//API content assigned
const apiContent = news.details;
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
