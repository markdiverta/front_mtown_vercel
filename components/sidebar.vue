<template>
    <section class="col-md-3 col-12 l-sidebar" fluid>

        <div v-if="sidebarEbook && sidebarEbook.loaded && sidebarEbook.url" class="l-content_padding -sm pt-0 c-sidebar_ebook">
            <h2 class="c-heading_bg --bg_grey c-heading_h3">最新号eBook</h2>
            <img class="c-img_fluid c-clickable mb-3" 
                @click="goTo(sidebarEbook.url)"
                :src="sidebarEbook.thumb + '?width=300'"
                width="300"
                height="437"
                alt="最新号eBook" 
                loading="lazy"
            >
            <div class="text-center">
                <NuxtLink class="c-btn c-btn_md c-btn_main-dark" to="/backnumber/">バックナンバーはこちら</NuxtLink>
            </div>
        </div>

        <div v-if="sidebarRanking && sidebarRanking.length > 0" class="l-content_padding -xs">
            <h2 class="c-heading_bg --bg_grey c-heading_h3">アクセスランキング</h2>
            <div class="container c-sidebar_list">
                <div class="row c-sidebar_list-item c-clickable" v-for="(item, index) in sidebarRanking" :key="index" @click="goTo(item.url)">
                    <div class="col-5 thumb" :style="{backgroundImage: 'url(' + item.thumb + '?width=206)' }">
                    </div>
                    <div class="col">
                        <h4 class="c-sidebar_list-heading">{{ item.title }}</h4>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="sidebarPR && sidebarPR.length > 0" class="l-content_padding -xs c-sidebar_ads">
            <h2 class="c-heading_bg --bg_grey c-heading_h3">広告(PR)</h2>
            <img class="c-img_fluid mb-3 c-clickable" 
                v-for="(item, index) in sidebarPR" :key="index"
                @click="goTo(item.url)"
                :src="item.thumb + '?width=300'"
                width="300"
                height="129"
                alt="広告(PR)" 
                loading="lazy"
            >
        </div>
        
        <!-- Facebook -->
        <!-- <div class="l-content_padding -xs">
        <h2 class="c-heading_bg --bg_grey c-heading_h3">SNS</h2>
        <div class="l-sidebar_fb">
            <div id="fb-root"></div>
            <div class="fb-page" data-href="https://www.facebook.com/weeklymtown" data-show-posts="true"  data-width="" data-height="500" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false">
            <!-- Placeholder for Facebook component -->
            <!--</div>
        </div>
        </div> -->
        
        <!-- <client-only> -->
        <!-- Twitter -->
        <!-- <div class="l-content_padding -xs">
        <div id="twitter-timeline" class="l-sidebar_twitter"> -->
            <!-- Placeholder for Twitter component -->
        <!-- </div>
        </div>
        </client-only> -->

        <div v-if="sidebarRelated && sidebarRelated.length > 0" class="l-content_padding -xs c-sidebar_ads">
            <h2 class="c-heading_bg --bg_grey c-heading_h3">関連メディア</h2>
            <img class="c-img_fluid mb-3 c-clickable" 
                v-for="(item, index) in sidebarRelated" :key="index"
                @click="goTo(item.url)"
                :src="item.thumb + '?width=300'"
                width="300"
                height="129"
                alt="関連メディア" 
                loading="lazy"
            >
        </div>
        
    </section> 
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

//Global setting
const config = useRuntimeConfig(); //API route
const route = useRoute();
const router = useRouter();

//Function
const goTo = (url) => {
    if (url.includes('http')) {
        window.location.href = url;
    } else {
        router.push(url);
    }
};

//Social Media feed
/*
onMounted(() => {
  // Load Facebook SDK
  window.fbAsyncInit = function () {
    FB.init({
      xfbml: true,
      version: 'v16.0'
    });
  };
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/ja_JP/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

// Load Twitter SDK
  const script = document.createElement('script');
  script.src = 'https://platform.twitter.com/widgets.js';
  script.async = true;
  script.defer = true;

  document.head.appendChild(script);

  script.onload = () => {
    // Now the Twitter SDK is loaded, create the timeline
    createTwitterTimeline();
  };

  script.onerror = (error) => {
    console.error('Error loading Twitter SDK:', error);
  };

  function createTwitterTimeline() {
    // Create a Twitter timeline widget
    twttr.widgets.createTimeline(
      {
        sourceType: 'timeline',
        screenName: 'weeklymtown',
      },
      document.getElementById('twitter-timeline'),
      {
        height: 500,
        tweetLimit: 4,
      }
    );
  }
});
*/

//======== Ebook
const sidebarEbook = ref({});
const { data: news, error } = await useFetch(
`${config.public.kurocoApiDomain}/rcms-api/1/content/details/47641`,
{
    credentials: 'include',
}
);
if (!error.value) {
    let item = news.value.details;
    let sidebarEbookContent = sidebarEbook.value;
    sidebarEbookContent.url = item.ext_1;
    sidebarEbookContent.thumb = item.ext_2;
    sidebarEbookContent.loaded = true;
    sidebarEbook.value = sidebarEbookContent;
} else {
  console.error('Fetch error:', error.value);
};


//======== Ranking
const sidebarRanking = ref({});
const { data: ranking, error: errorRanking  } = await useFetch(
`${config.public.kurocoApiDomain}/rcms-api/1/content/ranking?cnt=5`,
{
    credentials: 'include',
}
);
if (!errorRanking.value) {
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
} else {
    console.error('Fetch error:', errorRanking.value);
};

//======== PR
const sidebarPR = ref({});
const sidebarRelated = ref({});
const { data: prContent, error: errorPrContent } = await useFetch(
`${config.public.kurocoApiDomain}/rcms-api/1/content/details/47640`,
{
    credentials: 'include',
}
);
if (!errorPrContent.value) {
    let topics = [];
    if (prContent) {
        let item = prContent.value.details;
        let topicsRelated = [];
        if (item.ext_2) {
            for (let key in item.ext_2) {
                let thumb = item.ext_2[key];
                topics.push({
                    title: item.ext_3[key].title,
                    url: item.ext_3[key].url,
                    thumb: thumb,
                });
            };
        };
        if (item.ext_4) {
            for (let key in item.ext_4) {
                let thumb = item.ext_4[key];
                topicsRelated.push({
                    title: item.ext_5[key].title,
                    url: item.ext_5[key].url,
                    thumb: thumb,
                });
            };
        };
        sidebarPR.value = topics;
        sidebarRelated.value = topicsRelated;
    };
} else {
    console.error('Fetch error:', errorPrContent.value);
};


</script>