<template>
<section class="p-page_blog l-content_maxWidth-lg l-container">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

    <div class="l-page_content">
          
        <ArticleNewsLandingStg :catSlug="catSlug" :apiURLBase="apiURLBase" :apiURL="apiURL" :isSearch="1"/>

    </div>

</section>

<Sidebar/>

</section><!--l-page_content-row-->
</section><!--container-fluid-->
</template>

<script setup>
//Global setting
const config = useRuntimeConfig(); //API route
const catSlug = '/news/';
const topicID = '1';

//Get search keywords
const route = useRoute();
var searchKeyword;
if (typeof route.query?.keyword != 'undefined' && route.query?.keyword != ''){
    searchKeyword = route.query.keyword;
    if (searchKeyword.charAt(searchKeyword.length - 1) === '/') {
        searchKeyword = searchKeyword.slice(0, -1);
    };
};

//API Content setting
const apiURLBase = ref(`${config.public.kurocoApiDomain}/rcms-api/1/content/list?topics_keyword=${searchKeyword}`);
const apiURL = ref(apiURLBase.value);
const topics = ref('[]');


//If coming from footer mobile menu
if (typeof route.query?.filter != 'undefined' && route.query?.filter == 'topics') {
    apiURL.value = `${config.public.kurocoApiDomain}/rcms-api/1/content/list?topics_group_id%5B%5D=10&topics_group_id%5B%5D=7&topics_group_id%5B%5D=8`;
};

//Link function
const goTo = (url) => {
    window.location.href = url;
};
</script>
