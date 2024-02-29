<template>
<section class="p-about l-content_maxWidth-lg l-container">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

    <div class="l-page_content">
      <div class="l-breadcum">
          <a href="/" class="item">ホーム</a>
          <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
          <span class="item">{{topics.title}}</span>
      </div>

      <h1 class="p-heading">{{topics.title}}</h1>

      <section>
          <div v-if="topics.desc" v-html="topics.desc"></div>
      </section>

    </div>

</section>

<Sidebar/>

</section><!--l-page_content-row-->
</section><!--container-fluid-->
</template>

<script setup>
//Global setting
const config = useRuntimeConfig(); //API route


//API Content setting
const apiURLBase = ref(`${config.public.kurocoApiDomain}/rcms-api/1/content/details/47639`);
const apiURL = ref(apiURLBase.value);
const topics = ref('[]');
const pageTitle = '会社概要 | MTown(エムタウン)';

async function mainContent() {
  try {
    const response = await fetch(apiURL.value, {
      credentials: 'include',
    });
    const responseData = await response.json(); //Convert to json to use on content structuring
    const item = responseData.details;
    let content = [];

    content.date = item.ymd.substring(0, 10).replaceAll('-', '.');
    content.title = pageTitle ? pageTitle : item.subject;
    content.desc = item.contents;
    content.cat = item.contents_type_nm;
    content.id = item.topics_id;

    topics.value = content;
  }
  catch (error) {
    console.error('Error in fetchData:', error);
  }
};
mainContent();

//Link function
const goTo = (url) => {
    window.location.href = url;
};

useHead({
    title: '会社概要',
    meta: [
        {
            hid: 'og:title',
            property: 'og:title',
            content: '会社概要'
        },
        {
            hid: 'og:description',
            property: 'og:description',
            content: 'マレーシアの週刊フリーペーパー＆WEBのMTown(エムタウン)を運営するMega Global Media Malaysia Sdn. Bhd.（メガグループ）の会社概要です。'
        },
        {
            hid: 'description',
            name: 'description',
            content: 'マレーシアの週刊フリーペーパー＆WEBのMTown(エムタウン)を運営するMega Global Media Malaysia Sdn. Bhd.（メガグループ）の会社概要です。'
        }
    ]
});
</script>
