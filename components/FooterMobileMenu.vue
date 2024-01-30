<template>
  <ul class="c-menu_footerfloat">
      <li><a href="/news/"><i class="icon mdi mdi-bullhorn"></i>ニュース</a></li>
      <li><a href="/search/?filter=topics"><i class="icon mdi mdi-file-document-outline"></i>記事</a></li>
      <li class="last"><a href="/feature/"><i class="icon mdi mdi-gift"></i>特集</a></li>
      <li class="more">
          <a id="menu_button" @click="showMenuFooter">
              <span :class="{ 'd-none' : menuOpenFooter }">
                  <i class="icon mdi mdi-menu"></i>メニュー
              </span>
              <span :class="{ 'd-none' : !menuOpenFooter }">
                  <i class="icon mdi mdi-window-close"></i>閉じる
              </span>
          </a>
      </li>
  </ul>
  <div class="c-menu_footerfloat-burger" :class="{ 'open' : menuOpenFooter }">
      <div class="content">

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

          <div class="c-menu_footerfloat-list section">
              <p class="section_heading">カテゴリ</p>

              <UAccordion 
                open-icon="i-heroicons-plus"
                close-icon="i-heroicons-minus"
                :items="items" 
                class="menu">
                <template #item="{ item }">
                    <div class="menu-wrap">
                        {{ item.content }}
                    </div>
                </template>

                <template #tab1>
                    <div class="menu-wrap">
                    <ul class="innermenu">
                        <li><a href="/news/">新着</a></li>
                        <li><a href="/news/economic/">経済・現地企業</a></li>
                        <li><a href="/news/politics/">政治・社会</a></li>
                        <li><a href="/news/nikkei/">日系企業動向</a></li>
                        <li><a href="/news/others/">芸能・スポーツ</a></li>
                        <li><a href="/news/covid-19/">コロナ</a></li>
                    </ul>
                    </div>
                </template>
                <template #tab2>
                    <div class="menu-wrap">
                    <ul class="innermenu">
                        <li><a href="/eat/">グルメ記事</a></li>
                        <li><a href="https://gourmesian.com/" target="_blank">レストラン検索</a></li>
                    </ul>
                    </div>
                </template>
                <template #tab3>
                    <div class="menu-wrap">
                    <ul class="innermenu">
                        <li><a href="/life/">街ぶらブログ</a></li>
                        <li><a href="/community/">コミュニティ</a></li>
                    </ul>
                    </div>
                </template>
                <template #tab4>
                    <div class="menu-wrap">
                    <ul class="innermenu">
                        <li><a href="/column/comics/">4コマ</a></li>
                        <li><a href="/column/malaysia-profiles/">マレーシア美人ライフ</a></li>

                        <template v-if="dynamicMenu.length > 0">
                            <li v-for="(item, index) in dynamicMenu" :key="index">
                                <a :href="item.url">{{ item.title }}</a>
                            </li>
                        </template>
                    </ul>
                    </div>
                </template>
                
            </UAccordion>

          </div>

          <div class="c-menu_footerfloat-social section">    
              <p class="section_heading">Mtown公式SNSをフォロー</p>
              <ul class="p-3">
                  <li><a href="https://www.facebook.com/weeklymtown/" target="_blank"><img src="~/assets/images/fb.png" width="139" height="79"><noscript><img src="~/assets/images/fb.png"  width="139" height="79"/></noscript></a></li>
                  <li><a href="https://twitter.com/WeeklyMtown" target="_blank"><img src="~/assets/images/tw.png"  width="139" height="79" data-src="~/assets/images/tw.png" decoding="async" class=" lazyloaded"><noscript><img src="~/assets/images/tw.png"  width="139" height="79" data-eio="l" /></noscript></a></li>
                  <li><a href="https://www.instagram.com/accounts/login/?next=/weeklymtown/" target="_blank"><img src="~/assets/images/ins.png"  width="139" height="79" data-src="~/assets/images/ins.png" decoding="async" class=" lazyloaded"><noscript><img src="~/assets/images/ins.png"  width="139" height="79" data-eio="l" /></noscript></a></li>
              </ul>
          </div>

          <div class="section">
              <p class="section_heading">関連メディア</p>
              <div class="c-menu_footerfloat-related">
                  <p>グルメシアン[<a href="https://gourmesian.com/" target="_blank">外食・グルメ情報はこちら</a>]</p>
                  <p>生活情報サイト[<a href="https://malaysialife.mtown.my/" target="_blank">生活お役立ち情報はこちら</a>]</p>
              </div>
          </div>

          <div class="c-menu_footerfloat-footer">
              <a href="/newsletter/" class="c-btn c-btn_main">メルマガ登録</a>
              <a href="/inquiry/" class="c-btn c-btn_main-dark">お問い合わせ<span class="d-sm-inline d-none">はこちら</span></a>
              <p class="pt-4">週刊Mtown運営会社情報<br>
              Mega Global Malaysia Sdn. Bhd.</p>
          </div>          
      </div>
  </div>
</template>

<script setup>
//Global setting
const config = useRuntimeConfig(); //API route

//Slide-in menu open & close function
const menuOpen = ref(false);
const menuOpenFooter = ref(false);
const showMenu = () => {
  if (menuOpen.value) {
      menuOpen.value = false;
  } else {
      menuOpen.value = true;
  }
};
const showMenuFooter = () => {
  if (menuOpenFooter.value) {
      menuOpenFooter.value = false;
  } else {
      menuOpenFooter.value = true;
  }
};

//Link menu tab function
if (process.client) {
    const menuTabLink = document.getElementsByClassName('menuLink');
    for (var i = 0; i < menuTabLink.length; i++) {
        menuTabLink[i].addEventListener('click', function(event){
            event.preventDefault(); //Prevent deafault open tab
            let url = this.getAttribute('jsClass');
            let target = url.includes('http') ? '_blank' : '_self';
            if (url) {
                window.open(url, target);
            }
        })
    };
};

//Accordian menu setting
const items = [{
    label: 'マレーシアニュース',
    // defaultOpen: true,
    slot: 'tab1',
}, 
{
    label: 'グルメ',
    slot: 'tab2',
}, 
{
    label: 'タウン情報',
    slot: 'tab3',
}, 
{
    label: 'インタビュー',
    class: 'menuLink',
    jsClass: '/interview/',
}, 
{
    label: '特集',
    class: 'menuLink',
    jsClass: '/feature/',
}, 
{
    label: '求人・求職情報',
    class: 'menuLink',
    jsClass: 'https://job.mtown.my/',
}, 
{
    label: 'コラム',
    slot: 'tab4',
}, 
{
    label: '暮らしのガイド',
    class: 'menuLink',
    jsClass: 'https://malaysialife.mtown.my/',
}];


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
