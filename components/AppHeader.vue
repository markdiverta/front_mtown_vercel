<template>
<header>
        <section class="l-header_top">
            <div class="l-content_maxWidth-lg">
            <div class="row">
                <div class="col-sm-6 col-12 d-sm-block d-none"> 
                    <NuxtLink to="/" title="MTown"> 
                        <img src="~/assets/images/logo.png" alt="MTown - マレーシアの週刊情報誌 Logo" class="l-header_logo" width="279" height="100">
                    </NuxtLink>
                </div>
                <div class="col l-header_top-right">
                <div class="row">
                    <div class="col-5 d-sm-none d-block py-0">
                        <NuxtLink to="/" title="MTown"> 
                            <img src="~/assets/images/logo.png" alt="MTown - マレーシアの週刊情報誌 Logo" class="l-header_logo" width="160" height="57">
                        </NuxtLink>
                    </div>
                    <div class="col pb-0">
                        <NuxtLink to="/newsletter/" class="c-btn c-btn_main">メルマガ登録</NuxtLink>
                        <NuxtLink to="/inquiry/" class="c-btn c-btn_main-dark">お問い合わせ<span class="d-sm-inline d-none">はこちら</span></NuxtLink>
                    </div>
                    <div class="col-12 pt-0">
                        <form class="c-form row pt-4" action="/search">
                            <div class="col">
                                <input
                                    type="text"
                                    placeholder="ニュース検索　例：マレーシア Covid-19 感染者数"
                                    class="l-header_top-search v-input"
                                    outlined
                                    name="keyword"
                                />
                            </div>
                            <div class="col-auto">
                                <button
                                    type="submit"
                                    block
                                    class="c-btn_main-dark c-btn submit-btn"
                                >
                                    検索
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>

        <section class="c-mainmenu_wrap" :class="noDropdown">
            <div class="l-content_maxWidth-lg c-mainmenu_outer">
            <!-- <button class="c-mainmenu_trigger" @click="showMenu"><i aria-hidden="true" class="icon mdi mdi-menu" style="color"></i></button> -->
            <!-- <ul class="c-mainmenu" :class="{ 'c-mainmenu_open' : menuOpen }"> -->
            <ul class="c-mainmenu">
                <li :class="currentPage('/news') ? 'activePage' : ''">
                    <NuxtLink to="/news">マレーシアニュース</NuxtLink>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li><NuxtLink to="/news">新着</NuxtLink></li>
                            <li :class="searchCatPath('economic') ? 'active' : ''"><NuxtLink to="/news/economic">経済・現地企業</NuxtLink></li>
                            <li :class="searchCatPath('politics') ? 'active' : ''"><NuxtLink to="/news/politics">政治・社会</NuxtLink></li>
                            <li :class="searchCatPath('nikkei') ? 'active' : ''"><NuxtLink to="/news/nikkei">日系企業動向</NuxtLink></li>
                            <li :class="searchCatPath('others') ? 'active' : ''"><NuxtLink to="/news/others">芸能・スポーツ</NuxtLink></li>
                            <li :class="searchCatPath('covid-19') ? 'active' : ''"><NuxtLink to="/news/covid-19">コロナ</NuxtLink></li>
                        </ul>
                    </div>
                </li>
                <li :class="currentPage('/eat') ? 'activePage' : ''">
                    <NuxtLink to="/eat/">グルメ</NuxtLink>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li :class="currentPage('/eat') ? 'active' : ''"><NuxtLink to="/eat/">グルメ記事</NuxtLink></li>
                            <li><NuxtLink to="https://gourmesian.com/" target="_blank">レストラン検索</NuxtLink></li>
                        </ul>
                    </div>
                </li>
                <li :class="currentPage('/life')  || currentPage('/community') ? 'activePage' : ''">
                    <NuxtLink to="/life/">タウン情報</NuxtLink>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li :class="currentPage('/life') ? 'active' : ''"><NuxtLink to="/life/">街ぶらブログ</NuxtLink></li>
                            <li :class="currentPage('/community') ? 'active' : ''"><NuxtLink to="/community/">コミュニティ</NuxtLink></li>
                        </ul>
                    </div>
                </li>
                <li :class="currentPage('/interview') ? 'activePage' : ''">
                    <NuxtLink to="/interview">インタビュー</NuxtLink>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li><NuxtLink to="/interview">新着</NuxtLink></li>
                        </ul>
                    </div>
                </li>
                <li :class="currentPage('/feature') ? 'activePage' : ''">
                    <NuxtLink to="/feature/">特集</NuxtLink>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li><NuxtLink to="/feature">新着</NuxtLink></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <NuxtLink to="https://job.mtown.my/" target="_blank">求人・求職情報一覧</NuxtLink>
                    <div class="c-mainmenu_dropdown-wrap"></div>
                </li>
                <li :class="currentPage('/column/') ? 'activePage' : ''">
                    <NuxtLink to="/column/comics">コラム</NuxtLink>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li :class="currentPage('/comics') ? 'active' : ''"><NuxtLink to="/column/comics/">4コマ</NuxtLink></li>
                            <li :class="currentPage('/malaysia-profiles') ? 'active' : ''"><NuxtLink to="/column/malaysia-profiles/">マレーシア美人ライフ</NuxtLink></li>
                            
                            <!-- <template v-if="dynamicMenu.length > 0"> 
                                <li v-for="(item, index) in dynamicMenu" :key="index" :class="currentPage('/' + item.slug + '/') ? 'active' : ''">
                                    <NuxtLink :to="item.url">{{ item.title }}</NuxtLink>
                                </li>
                            </template> -->

                            <li :class="currentPage('/j-league') ? 'active' : ''"><NuxtLink to="/column/j-league/">Jリーグ</NuxtLink></li>
                            <li :class="currentPage('/malaysia-calendar') ? 'active' : ''"><NuxtLink to="/column/malaysia-calendar/">マレーシアの暦</NuxtLink></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <NuxtLink to="https://malaysialife.mtown.my/" target="_blank">暮らしのガイド</NuxtLink>
                    <div class="c-mainmenu_dropdown-wrap"></div>
                </li>
            </ul>
            </div>
        </section>
        </header>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const Drawer = ref(false);
const router = useRouter();

//Global setting
const config = useRuntimeConfig(); //API route

//Main menu dropdown menu
//const currentPage = computed(() => router.currentRoute.value.path);  Depreciate old solution with redundance JS
const noDropdown = ref("--noDropdown");
const menuCheck = ref("");
const currentPage = (url) => {
    let currentPath = router.currentRoute.value.path;
    if (currentPath.includes(url) && currentPath !== '/') { //if is not home page and path is match or if is home page
        noDropdown.value = "";
        menuCheck.value = '1';
        return true;
    } 
    else if (currentPath == '/' && url == '/news') {
        noDropdown.value = "";
        menuCheck.value = '1';
        return true;
    }
    else {
        return false;
    };
};
//Whenever page route changed
router.afterEach((to, from) => {
  noDropdown.value = "--noDropdown";
});

// const currentPage = (url) => {
//     let currentPath = router.currentRoute.value.path;
//     console.log(currentPath == '/' && url == '/news');
//     if (!menuCheck.value) {
//         console.log('access');
//         if (currentPath.includes(url) && currentPath !== '/') { //if is not home page and path is match or if is home page
//             console.log('1');
//             noDropdown.value = "";
//             menuCheck.value = '1';
//             return true;
//         } 
//         else if (currentPath == '/' && url == '/news') {
//             console.log('2');
//             noDropdown.value = "";
//             menuCheck.value = '1';
//             return true;
//         }
//         else {
//             console.log('3');
//             noDropdown.value = "--noDropdown";
//             return false;
//         };
//     }
// };
const searchCatPath = (url) => {
    if (url == router.currentRoute.value.params.category) {
        return true
    }
};

//Dynamic header menu - コラム
// const menuAPI = ref(`${config.public.kurocoApiDomain}/rcms-api/1/content/category?topics_group_id=14`);
// var response = await fetch(menuAPI.value, {
//     credentials: 'include',
// });
// const menuData = await response.json();
// var dynamicMenu = [];
// for (let key in menuData.list) {
//     let item = menuData.list[key];
//     if (item.slug) {
//         dynamicMenu.push({
//             slug: item.slug,
//             url: '/column/' + item.slug + '/',
//             title: item.category_nm,
//         });
//     };
// };
</script>

