<template>
<header>
        <section class="l-header_top">
            <div class="l-content_maxWidth-lg">
            <div class="row">
                <div class="col-sm-6 col-12 d-sm-block d-none">
                    <a href="/" title="MTown"> 
                        <img src="~/assets/images/logo.png" alt="MTown - マレーシアの週刊情報誌 Logo" class="l-header_logo" width="279" height="100">
                    </a>
                </div>
                <div class="col l-header_top-right">
                <div class="row">
                    <div class="col-5 d-sm-none d-block py-0">
                        <a href="/" title="MTown"> 
                            <img src="~/assets/images/logo.png" alt="MTown - マレーシアの週刊情報誌 Logo" class="l-header_logo" width="160" height="57">
                        </a>
                    </div>
                    <div class="col pb-0">
                        <a href="/newsletter/" class="c-btn c-btn_main">メルマガ登録</a>
                        <a href="/inquiry/" class="c-btn c-btn_main-dark">お問い合わせ<span class="d-sm-inline d-none">はこちら</span></a>
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
                                    v-model="keyword"
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
                    <a href="/news">マレーシアニュース</a>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li><a href="/news">新着</a></li>
                            <li :class="searchCat == '23' || searchCatPath == 'economic' ? 'active' : ''"><a href="/news/economic">経済・現地企業</a></li>
                            <li :class="searchCat == '21' || searchCatPath == 'politics' ? 'active' : ''"><a href="/news/politics">政治・社会</a></li>
                            <li :class="searchCat == '22' || searchCatPath == 'nikkei' ? 'active' : ''"><a href="/news/nikkei">日系企業動向</a></li>
                            <li :class="searchCat == '24' || searchCatPath == 'others' ? 'active' : ''"><a href="/news/others">芸能・スポーツ</a></li>
                            <li :class="searchCat == '1' || searchCatPath == 'covid-19' ? 'active' : ''"><a href="/news/covid-19">コロナ</a></li>
                        </ul>
                    </div>
                </li>
                <li :class="currentPage('/eat') ? 'activePage' : ''" clas="1232">
                    <a href="/eat/">グルメ</a>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li :class="currentPage('/eat') ? 'active' : ''"><a href="/eat/">グルメ記事</a></li>
                            <li><a href="https://gourmesian.com/" target="_blank">レストラン検索</a></li>
                        </ul>
                    </div>
                </li>
                <li :class="currentPage('/life')  || currentPage('/community') ? 'activePage' : ''">
                    <a href="/life/">タウン情報</a>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li :class="currentPage('/life') ? 'active' : ''"><a href="/life/">街ぶらブログ</a></li>
                            <li :class="currentPage('/community') ? 'active' : ''"><a href="/community/">コミュニティ</a></li>
                        </ul>
                    </div>
                </li>
                <li :class="currentPage('/interview') ? 'activePage' : ''">
                    <a href="/interview">インタビュー</a>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li><a href="/interview">新着</a></li>
                        </ul>
                    </div>
                </li>
                <li :class="currentPage('/feature') ? 'activePage' : ''">
                    <a href="/feature/">特集</a>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li><a href="/feature">新着</a></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="https://job.mtown.my/" target="_blank">求人・求職情報一覧</a>
                    <div class="c-mainmenu_dropdown-wrap"></div>
                </li>
                <li :class="currentPage('/column/') ? 'activePage' : ''">
                    <a href="/column/comics">コラム</a>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li :class="currentPage('/comics') ? 'active' : ''"><a href="/column/comics/">4コマ</a></li>
                            <li :class="currentPage('/malaysia-profiles') ? 'active' : ''"><a href="/column/malaysia-profiles/">マレーシア美人ライフ</a></li>
                            
                            <template v-if="dynamicMenu.length > 0">
                                <li v-for="(item, index) in dynamicMenu" :key="index" :class="currentPage('/' + item.slug + '/') ? 'active' : ''">
                                    <a :href="item.url">{{ item.title }}</a>
                                </li>
                            </template>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="https://malaysialife.mtown.my/" target="_blank">暮らしのガイド</a>
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
        return true;
    } 
    else if (currentPath == '/' && url == '/news') {
        noDropdown.value = "";
        return true;
    }
    else {        
        return false;
    };
};

//Dynamic header menu - コラム
const menuAPI = ref(`${config.public.kurocoApiDomain}/rcms-api/1/content/category?topics_group_id=14`);
var response = await fetch(menuAPI.value, {
    credentials: 'include',
});
const menuData = await response.json();
var dynamicMenu = [];
for (let key in menuData.list) {
    let item = menuData.list[key];
    if (item.slug) {
        dynamicMenu.push({
            slug: item.slug,
            url: '/column/' + item.slug + '/',
            title: item.category_nm,
        });
    };
};
</script>

