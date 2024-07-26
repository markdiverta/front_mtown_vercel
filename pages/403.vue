<template>
<section>

    <div class="text-center mt-5 py-5">
        <h1>403 - Forbidden</h1>
        <p>Private site, authorised access only</p>
    </div>

</section>
</template>

<script setup>

definePageMeta({
  layout: false
});

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
const apiURLBase = ref(`${config.public.kurocoApiDomain}/rcms-api/1/content/search?topics_keyword=${searchKeyword}`);
const apiURL = ref(apiURLBase.value);
const topics = ref('[]');

//If coming from footer mobile menu
if (typeof route.query?.filter != 'undefined' && route.query?.filter.includes('topics')) {
    apiURL.value = `${config.public.kurocoApiDomain}/rcms-api/1/content/list?topics_group_id%5B%5D=10&topics_group_id%5B%5D=7&topics_group_id%5B%5D=8`;
    apiURLBase.value = apiURL.value;
};

//Link function
const goTo = (url) => {
    window.location.href = url;
};
</script>
