<template>
    <section class="col-md-3 col-12 l-sidebar" fluid>

        <div v-if="sidebarEbook.loaded && sidebarEbook.url" class="l-content_padding -sm pt-0 c-sidebar_ebook">
            <h2 class="c-heading_bg --bg_grey c-heading_h3">最新号eBook</h2>
            <img class="c-img_fluid c-clickable mb-3" 
                @click="windowOpen(sidebarEbook.url)"
                :src="sidebarEbook.thumb + '?width=300'"
                width="300"
                height="437"
            >
            <div class="text-center">
                <a class="c-btn c-btn_md c-btn_main-dark" href="/backnumber/">バックナンバーはこちら</a>
            </div>
        </div>

        <div v-if="sidebarRanking && sidebarRanking.length > 0" class="l-content_padding -xs">
            <h2 class="c-heading_bg --bg_grey c-heading_h3">アクセスランキング</h2>
            <div class="container c-sidebar_list">
                <div class="row c-sidebar_list-item c-clickable" v-for="(item, index) in sidebarRanking" :key="index" @click="windowOpen(item.url)">
                    <div class="col-5 thumb" :style="{backgroundImage: 'url(' + item.thumb + '?width=206)' }">
                    </div>
                    <div class="col">
                        <h4 class="c-sidebar_list-heading">{{ item.title }}</h4>
                    </div>
                </div>
            </div>
        </div>
        
    </section> 
</template>

<script setup>
import { ref, onMounted } from 'vue';

//Ebook
const sidebarEbook = ref({});
const { data: news } = await useFetch(
`https://mtown-vercel.g.kuroco.app/rcms-api/1/content/details/47641`,
{
    credentials: 'include',
}
);
let item = news.value.details;
let sidebarEbookContent = sidebarEbook.value;
sidebarEbookContent.url = item.ext_1;
sidebarEbookContent.thumb = item.ext_2;
sidebarEbookContent.loaded = true;
sidebarEbook.value = sidebarEbookContent;


//Ranking
const sidebarRanking = ref({});
const { data: ranking } = await useFetch(
`https://mtown-vercel.g.kuroco.app/rcms-api/1/content/ranking?cnt=5`,
{
    credentials: 'include',
}
);
let topics = [];
let topicsCategory = [
    {
        catSlug: '/news/',
        catID: 1
    },
    {
        catSlug: '/eat/',
        catID: 7
    },
    {
        catSlug: '/life/',
        catID: 8
    },
    {
        catSlug: '/feature/',
        catID: 9
    },
    {
        catSlug: '/interview/',
        catID: 10
    },
    {
        catSlug: '/j-league/',
        catID: 14
    },
];
for (let key in ranking.value.list) {
    let item = ranking.value.list[key];
    let newsSlug = item.contents_type_slug ? item.contents_type_slug + '/' : '';
    let title = item.subject;
    let catSlug = '';
    let url;
    if (title.length > 35) {
        title = title.substring(0, 35);
        title += '...';
    };
    for (let cat in topicsCategory) {
        if (topicsCategory[cat].catID == item.topics_group_id) {
            catSlug = topicsCategory[cat].catSlug;
            break;
        }
    };
    url = catSlug + newsSlug + item.slug;
    if (url.includes('//')) {
        url = url.replace(/\/{2,}/g, '/');
    };
    topics.push({
        title: title,
        url: url,
        thumb: item.ext_1,
    });
};
sidebarRanking.value = topics;

</script>