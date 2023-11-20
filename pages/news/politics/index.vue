<template>
<section class="p-article l-content_maxWidth-lg l-container">

<!-- <Head>
    <Title>{{response2.details?.subject}}</Title>
    {{metaDesc}}
    <Meta name="description" :content="metaDesc"/>
</Head> -->

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

        <article class="c-article">
        <div class="l-container--large l-container--contents">
            <div v-html="response2.details?.contents"></div>
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

const metaDesc = ref('');
const metaTitle = response2.details?.subject;

const { data: response2 } = await useFetch(
    'https://mtown-vercel.g.kuroco.app/rcms-api/1/content/details/saujana-villa-condominium',
    {
        credentials: 'include',
    }
);

useHead({
  metaTitle,
  meta: [{
    name: 'description',
    content: metaDesc.value
  }]
});

const apiContent = response2.value.details;

// Shorten meta description
if (apiContent.contents) {
  let description = apiContent.contents.replace(/<[^>]+>/g, '').replace(/[\r\n]+/g, '');
  if (description.length > 120) {
    description = description.substring(0, 120) + '...';
  }
  metaDesc.value = description;
};


// const response2 = ref('');

// onMounted(async () => {
//   console.log('enter 2');
//   try {
//     const response = await fetch('https://dev-mtown.g.kuroco.app/rcms-api/1/content/details/saujana-villa-condominium');
//     const data = await response.json();
//     response2.value = data;
//     console.log(data);
//     console.log(response2);

//     // Set dynamic meta title
//     document.title = response2.value.details?.subject || 'Default Title';

//     const metaDescription = document.querySelector('meta[name="description"]');
//     if (metaDescription) {
//         let description = response2.value.details?.contents.replace(/<[^>]+>/g, '').replace(/[\r\n]+/g, '');
//         if (description.length > 120) {
//             description = description.substring(0, 120) + '...';
//         };
//         metaDescription.content = description;
//     }

//   } catch (error) {
//     console.error('Error fetching data from API', error);
//   }
// });

</script>
