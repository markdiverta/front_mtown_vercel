<template>
    <section class="col-md-3 col-12 l-sidebar" fluid> 
    <div v-if="contentEBook[0] && contentEBook[0].url" class="SSG_eBook l-content_padding -sm pt-0 c-sidebar_ebook">
        <h2 class="c-heading_bg --bg_grey c-heading_h3">最新号eBook</h2>
        <img class="c-img_fluid c-clickable mb-3" 
            @click="windowOpen(contentEBook[0].url)"
            :src="contentEBook[0].thumb + '?width=300'"
            width="300"
            height="437"
        >
        <div class="text-center">
            <a class="c-btn c-btn_md c-btn_main-dark" href="/backnumber/">バックナンバーはこちら</a>
        </div>
    </div>
    <div v-else-if="eBookLoaded && sidebarEbook.url" class="l-content_padding -sm pt-0 c-sidebar_ebook">
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

    <div v-if="contentRanking && contentRanking.length > 0" class="SSG_Ranking l-content_padding -xs">
        <h2 class="c-heading_bg --bg_grey c-heading_h3">アクセスランキング</h2>
        <div class="container c-sidebar_list">
            <div class="row c-sidebar_list-item c-clickable" v-for="(item, index) in contentRanking" :key="index" @click="windowOpen(item.url)">
                <div class="col-5 thumb" :style="{backgroundImage: 'url(' + item.thumb + '?width=206)' }">
                </div>
                <div class="col">
                    <h4 class="c-sidebar_list-heading">{{ item.title }}</h4>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="sidebarRanking && sidebarRanking.length > 0" class="l-content_padding -xs">
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

    <!-- topics_group_id=18 共通 under this ext_02 only 広告（PR)（右側） -->
    <div v-if="contentPR && contentPR.length > 0 && !contentPR[0].notAvailable" class="SSG_PR l-content_padding -xs c-sidebar_ads">
        <h2 class="c-heading_bg --bg_grey c-heading_h3">広告(PR)</h2>
        <img class="c-img_fluid mb-3 c-clickable" 
            v-for="(item, index) in contentPR" :key="index"
            @click="windowOpen(item.url)"
            :src="item.thumb + '?width=300'"
            width="300"
            height="129"
        >
    </div>
    <div v-else-if="sidebarPR && sidebarPR.length > 0" class="l-content_padding -xs c-sidebar_ads">
        <h2 class="c-heading_bg --bg_grey c-heading_h3">広告(PR)</h2>
        <img class="c-img_fluid mb-3 c-clickable" 
            v-for="(item, index) in sidebarPR" :key="index"
            @click="windowOpen(item.url)"
            :src="item.thumb + '?width=300'"
            width="300"
            height="129"
        >
    </div>

    <!-- Facebook & Twitter -->
    <div class="l-content_padding -xs">
        <h2 class="c-heading_bg --bg_grey c-heading_h3">SNS</h2>
        <client-only>
            <div class="l-sidebar_fb">
                <div id="fb-root"></div>
                <!-- <script async defer crossorigin="anonymous" src="https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v16.0" nonce="Q2mDUmEw"></script> -->
                <div class="fb-page" data-href="https://www.facebook.com/weeklymtown" data-show-posts="true"  data-width="" data-height="500" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote cite="https://www.facebook.com/weeklymtown" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/weeklymtown">マレーシア生活情報誌　週刊M-town</a></blockquote></div>
            </div>
        </client-only>
    </div>
    <div class="l-content_padding -xs">
        <div id="twitter-timeline" class="l-sidebar_twitter"></div>
    </div>
    
    <!-- topics_group_id=18 共通 under this ext_04 only 関連メディア（右側） -->
    <div v-if="contentAds && contentAds.length > 0 && !contentAds[0].notAvailable" class="SSG_Ads l-content_padding -xs c-sidebar_ads">
        <h2 class="c-heading_bg --bg_grey c-heading_h3">関連メディア</h2>
        <img class="c-img_fluid mb-3 c-clickable" 
            v-for="(item, index) in contentAds" :key="index"
            @click="windowOpen(item.url)"
            :src="item.thumb + '?width=300'"
            width="300"
            height="129"
        >
    </div>
    <div v-else-if="sidebarRelated && sidebarRelated.length > 0" class="l-content_padding -xs c-sidebar_ads">
        <h2 class="c-heading_bg --bg_grey c-heading_h3">関連メディア</h2>
        <img class="c-img_fluid mb-3 c-clickable" 
            v-for="(item, index) in sidebarRelated" :key="index"
            @click="windowOpen(item.url)"
            :src="item.thumb + '?width=300'"
            width="300"
            height="129"
        >
    </div>
        
    </section> 
</template>

<script>
export default {
  name: 'SocialSharing',
  props: {
    contentRanking: {
      type: Array,
      required: false,
      default: null
    },
    contentEBook: {
      type: Array,
      required: false,
      default: null
    },
    contentAds: {
      type: Array,
      required: false,
      default: null
    },
    contentPR: {
      type: Array,
      required: false,
      default: null
    }
  },
  data() {
        return {
            sidebarRanking: [],
            sidebarEbook: [],
            eBookLoaded: false,
            sidebarPR: '',
            sidebarRelated: ''
        }
  },
  mounted() {
    const SSG_eBook = document.querySelector('.SSG_eBook');
    const SSG_Ranking = document.querySelector('.SSG_Ranking');
    const SSG_Ads = document.querySelector('.SSG_Ads');
    const SSG_PR = document.querySelector('.SSG_PR');

    if (!SSG_eBook) {
        this.SPAeBook();
    };
    if (!SSG_Ranking) {
        this.SPARanking();
    };
    if (!SSG_PR) {
        if (this.contentPR[0] && !this.contentPR[0].notAvailable) {
            this.SPAads();
        };
    };
    if (!SSG_Ads) {
        if (this.contentAds[0] && !this.contentAds[0].notAvailable) {
            this.SPAads();
        };
    }; 
  }, 
  methods: {
    goTo(url){
        if (url.includes('http')) {
            // window.location.href = url;
            window.open(url, "_blank");
        } else {
            // this.$router.push({ path: url})
            window.location.href = url;
        }
    },
    windowOpen(url){
        window.location.href = url;
    },
    SPAeBook() {
        let url =
        '/rcms-api/1/content/details/47641';
        const self = this;
        this.$store.$auth.ctx.$axios
            .get(url)
            .then(function (response) {
                const topics = [];
                let item = response.data.details;
                self.sidebarEbook.url = item.ext_1;
                self.sidebarEbook.thumb = item.ext_2;
                self.eBookLoaded = true;
            })
            .catch(function (error) {
                console.log(error.response.data.errors?.[0].message);
            });
    },
    SPARanking() {
        let url = '/rcms-api/1/content/ranking?cnt=5';
        const self = this;
        this.$store.$auth.ctx.$axios
            .get(url)
            .then(function (response) {
                const topics = [];
                const topicsCategory = [
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
                for (let key in response.data.list) {
                    let item = response.data.list[key];
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
                self.sidebarRanking = topics;
            })
            .catch(function (error) {
                console.log(error.response.data.errors?.[0].message);
            });
    },
    SPAads() {
        let url =
        '/rcms-api/1/content/details/47640';
        const self = this;
        this.$store.$auth.ctx.$axios
            .get(url)
            .then(function (response) {
                const topics = [];
                const topicsRelated = [];
                for (let key in response.data.details.ext_2) {
                    let thumb = response.data.details.ext_2[key];
                    topics.push({
                        title: response.data.details.ext_3[key].title,
                        url: response.data.details.ext_3[key].url,
                        thumb: thumb,
                    });
                };
                for (let key in response.data.details.ext_4) {
                    let thumb = response.data.details.ext_4[key];
                    topicsRelated.push({
                        title: response.data.details.ext_5[key].title,
                        url: response.data.details.ext_5[key].url,
                        thumb: thumb,
                    });
                };
                self.sidebarPR = topics;
                self.sidebarRelated = topicsRelated;
            })
            .catch(function (error) {
                console.log(error.response.data.errors?.[0].message);
            });
    },
  }
}
</script>