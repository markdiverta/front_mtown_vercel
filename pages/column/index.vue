<template>

<section class="p-page_blog l-content_maxWidth-lg l-container">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

    <div class="l-page_content">

      <ArticleNewsLanding :catSlug="catSlug" :apiURLBase="apiURLBase" :apiURL="apiURL"/>

    </div>
    
</section>

<Sidebar/>

</section>
</section>

</template>

<script setup>
//Global setting
const config = useRuntimeConfig(); //API route
const catSlug = '/news/';
const topicID = '14';


//API Content setting
const apiURLBase = ref(`${config.public.kurocoApiDomain}/rcms-api/1/content/list?topics_group_id=${topicID}`);
const apiURL = ref(apiURLBase.value);
const topics = ref('[]');

</script>