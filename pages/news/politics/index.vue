<template>
<section class="p-article l-content_maxWidth-lg l-container">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

    <div class="l-page_content">

        <div class="l-breadcum">
            <!--<a href="/"><i aria-hidden="true" class="icon home item mdi mdi-home"></i></a>-->
            <!-- <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i> -->
            <a href="/" class="item">ホーム</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <span class="item">{{pageParentName}}</span>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <span class="item">{{pageName}}</span>
        </div>

        {{contentPoll}}

        <article class="c-article">
        <div class="l-container--large l-container--contents">
            <div v-html="response2.details.contents"></div>
        </div>
        </article>

    </div>

</section>
<!-- <Sidebar :contentRanking="ranking" :contentEBook="sidebarEbook" :contentAds="sidebarAds" :contentPR="sidebarPR"/> -->
</section><!--l-page_content-row-->
</section><!--container-fluid-->
</template>

<script setup>

import { ref, onMounted } from 'vue';

const poll = ref(null);

onMounted(async () => {
  // Simulate asynchronous data fetching
  const response = await fetchData(); // Replace with your actual data fetching logic
  poll.value = response?.contentPoll;
});

// Simulate asynchronous data fetching function
async function fetchData() {
  // Replace with your actual data fetching logic
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ contentPoll: 'Your data here' });
    }, 1000);
  });
}

const { data: response2 } = await useFetch(
    'https://dev-mtown.g.kuroco.app/rcms-api/1/content/details/saujana-villa-condominium',
    {
        credentials: 'include',
    }
);

const head = () => ({
  title: 'testing page title',
  meta: [
    { hid: 'og:title', property: 'og:title', content: 'testing title' },
    { hid: 'description', name: 'description', content: 'testing description' },
  ],
});

</script>
