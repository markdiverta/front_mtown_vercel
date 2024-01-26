<template>
  <section class="l-content_maxWidth-lg">
  <section class="row l-page_content-row">
  <section class="col-md-9 col-12" fluid>

    <div class="l-page_content">
      
        <Carousel 
            autoplay="3000" 
            loop="true"
            wrapAround="true"
            class="c-carousel l-content_padding -xs pb-3"
            :items-to-show="3"
        >
            <Slide v-for="(item, index) in articleFeature" :key="index">
            <div class="c-carousel_slide" @click="goTo(item.url)" :style="{backgroundImage: 'url(' + item.thumb + ')' }">
                <span class="c-carousel_title">{{item.title}}</span>
            </div>
            </Slide>

            <template #addons>
                <Navigation class="c-carousel_nav"/>
            </template>
        </Carousel>

        <section class="l-content_padding pt-2 c-blog_list" v-if="articleNews.length > 0">
            <h2 class="c-heading_bg c-heading_h3">新着マレーシアニュース</h2>
            <div class="container">
                <div class="row c-blog_list-item" v-for="item in articleNews" :key="item.id" @click="goTo(item.url)">
                    <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                    <div class="col">
                        <h3>{{ item.title }}</h3>
                        <div class="mb-3">
                            <span class="date">{{ item.date }}</span>
                            <!-- <span class="label c-label">{{ item.cat }}</span> -->
                            <a :href="item.catURL"><span class="label c-label c-label_clickable">{{ item.cat }}</span></a>
                        </div>
                        <div v-if="item.desc" v-html="item.desc"></div>
                    </div>
                </div>
            </div>
            <div class="text-center l-content_padding -sm pb-0">
                <a href="/news/" class="c-btn c-btn_md c-btn_main-dark">ニュースをもっと読む</a>
            </div>
        </section>

        <section class="l-content_padding" v-if="articleEats && articleEats.length > 0">
            <h2 class="c-heading_bg --bg_red c-heading_h3">グルメ</h2>
            <section class="container-fluid c-blog_list --list_2col">
                <div class="row">
                    <template v-for="(item, index) in articleEats">
                    <div class="col-sm-6 col-12 c-blog_list-item" v-if="index < 4" :key="item.id" @click="goTo(item.url)">
                        <div class="thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                        <div>
                            <h3 class="heading">{{ item.title }}</h3>
                            <div class="mb-3">
                                <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                            </div>
                            <div v-if="item.desc" v-html="item.desc"></div>
                        </div>
                    </div>
                    </template>
                </div>
            </section>
            <section class="container-fluid mt-4 c-blog_list" v-if="articleEats.length > 3">
                <template v-for="(item, index) in articleEats">
                <div class="row c-blog_list-item" v-if="index > 3" :key="item.id" @click="goTo(item.url)">
                    <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                    <div class="col">
                        <h3>{{ item.title }}</h3>
                        <div class="mb-3">
                            <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                        </div>
                        <div v-if="item.desc" v-html="item.desc"></div> 
                    </div>
                </div>
                </template>
            </section>
            <div class="text-center l-content_padding -sm pb-0">
                <a href="/eat/" class="c-btn c-btn_lg c-btn_main-dark">グルメ記事をもっと読む</a>
            </div>
        </section>

        <section class="l-content_padding" v-if="articleLifes.length > 0">
            <h2 class="c-heading_bg --bg_green c-heading_h3">タウン情報</h2>
            <section class="container-fluid c-blog_list --list_2col">
                <div class="row">
                    <template v-for="(item, index) in articleLifes">
                    <div class="col-sm-6 col-12 c-blog_list-item" v-if="index < 4" :key="item.id" @click="goTo(item.url)">
                        <div class="thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                        <div>
                            <h3 class="heading">{{ item.title }}</h3>
                            <div class="mb-3">
                                <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                            </div>
                            <div v-if="item.desc" v-html="item.desc"></div>
                        </div>
                    </div>
                    </template>
                </div>
            </section>
            <section class="container-fluid mt-4 c-blog_list" v-if="articleLifes.length > 3">
                <template v-for="(item, index) in articleLifes">
                <div class="row c-blog_list-item" v-if="index > 3" :key="item.id" @click="goTo(item.url)">
                    <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                    <div class="col">
                        <h3>{{ item.title }}</h3>
                        <div class="mb-3">
                            <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                        </div>
                        <div v-if="item.desc" v-html="item.desc"></div>
                    </div>
                </div>
                </template>
            </section>
            <div class="text-center l-content_padding -sm pb-0">
                <a href="/life/" class="c-btn c-btn_lg c-btn_main-dark">タウン情報をもっと読む</a>
            </div>
        </section>
    
        <section class="l-content_padding" v-if="articleInterview.length > 0">
            <h2 class="c-heading_bg --bg_orange c-heading_h3">インタビュー</h2>
            <section class="container-fluid c-blog_list --list_2col">
                <div class="row">
                    <template v-for="(item, index) in articleInterview">
                    <div class="col-sm-6 col-12 c-blog_list-item" v-if="index < 4" :key="item.id" @click="goTo('/interview/' + item.id)">
                        <div class="thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                        <div>
                            <h3 class="heading">{{ item.title }}</h3>
                            <div class="mb-3">
                                <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                            </div>
                            <div v-if="item.desc" v-html="item.desc"></div>
                        </div>
                    </div>
                    </template>
                </div>
            </section>
            <section class="container-fluid mt-4 c-blog_list" v-if="articleInterview.length > 3">
                <template v-for="(item, index) in articleInterview">
                <div class="row c-blog_list-item" v-if="index > 3" :key="item.id" @click="goTo('/interview/' + item.id)">
                    <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                    <div class="col">
                        <h3>{{ item.title }}</h3>
                        <div class="mb-3">
                            <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                        </div>
                        <div v-if="item.desc" v-html="item.desc"></div>
                    </div>
                </div>
                </template>
            </section>
            <div class="text-center l-content_padding -sm pb-0">
                <a href="/interview/" class="c-btn c-btn_lg c-btn_main-dark">インタビューをもっと読む</a>
            </div>
        </section>

    </div>
  </section>

  <Sidebar/>

  </section><!--l-page_content-row-->
  </section><!--container-fluid-->
</template>

<script setup>
//======== Global setting
const config = useRuntimeConfig();


//Link function
const goTo = (url) => {
    window.location.href = url;
};

//Carousel
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const carouselContentLoaded = ref(false);
const articleFeature = ref([]);
async function featureCarousel() {
  const urlCarousel = `${config.public.kurocoApiDomain}/rcms-api/1/content/details/47640`;
  const response = await fetch(urlCarousel, {
        credentials: 'include',
    });
    const newsData = await response.json();
    let topics2 = [];
    for (const key in newsData.details.ext_1) {
        const item = newsData.details.ext_1[key];
        const title = item.title;
        topics2.push({
            title,
            url: item.url,
            thumb: newsData.details.ext_6[key],
        });
    }
    articleFeature.value = topics2;
    carouselContentLoaded.value = true;
};
featureCarousel();

//======== News Listing
const articleNews = ref({});
const { data: newsContent } = await useFetch(
  `${config.public.kurocoApiDomain}/rcms-api/1/content/list?topics_group_id=1&cnt=8`,
  {
    credentials: 'include',
  }
);
let topics = [];
let data = newsContent.value;
for (let key in data.list) {
    const item = data.list[key];
    let desc, url;
    let catURL = item.category_parent_id ? '/news/' + item.contents_type_slug : '/news/';
    if (item.contents) {
        desc = item.contents;
        desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
        if (desc.length > 120) {
            desc = desc.substring(0, 120);
            desc += '...';
        };
    };

    //Check if has child category or just parent category
    if (item.contents_type_slug && item.category_parent_id) {
        url = '/news/' + item.contents_type_slug + '/';
    } else {
        url = '/news/';
    };
    //Check if has page slug else use page id
    if (item.slug) {
        url += item.slug;
    } else {
        url += item.topics_id;
    };

    topics.push({
        date: item.ymd.substring(0, 10).replaceAll('-', '.'),
        title: item.subject,
        desc: desc,
        cat: item.contents_type_nm,
        catURL: catURL,
        id: item.topics_id,
        url: url,
        thumb: item.ext_1 + '?height=200',
    });
}
articleNews.value = topics;


//======== Eats Listing
const articleEats = ref({});
const { data: eatsContent } = await useFetch(
  `${config.public.kurocoApiDomain}/rcms-api/1/content/list?topics_group_id=7&cnt=6`,
  {
    credentials: 'include',
  }
);
topics = [];
data = eatsContent.value;
for (let key in data.list) {
    const item = data.list[key];
    let desc, url;
    if (item.contents) {
        desc = item.contents;
        desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
        if (desc.length > 100) {
            desc = desc.substring(0, 100);
            desc += '...';
        };
    };
    if (item.slug) {
        url = '/eat/' + item.slug;
    } else {
        url = '/eat/' + item.topics_id;
    };
    topics.push({
        date: item.ymd.substring(0, 10).replaceAll('-', '.'),
        title: item.subject,
        desc: desc,
        cat: item.contents_type_nm,
        id: item.topics_id,
        url: url,
        thumb: item.ext_1 + '?height=250',
    });
}
articleEats.value = topics;


//======== Lifes Listing
const articleLifes = ref({});
const { data: lifesContent } = await useFetch(
  `${config.public.kurocoApiDomain}/rcms-api/1/content/list?topics_group_id=8&cnt=6`,
  {
    credentials: 'include',
  }
);
topics = [];
data = lifesContent.value;
for (let key in data.list) {
    const item = data.list[key];
    let desc, url;
    if (item.contents) {
        desc = item.contents;
        desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
        if (desc.length > 100) {
            desc = desc.substring(0, 100);
            desc += '...';
        };
    };
    if (item.slug) {
        url = '/life/' + item.slug;
    } else {
        url = '/life/' + item.topics_id;
    };
    topics.push({
        date: item.ymd.substring(0, 10).replaceAll('-', '.'),
        title: item.subject,
        desc: desc,
        cat: item.contents_type_nm,
        id: item.topics_id,
        url: url,
        thumb: item.ext_1 + '?height=250',
    });
}
articleLifes.value = topics;


//======== Interview Listing
const articleInterview = ref({});
const { data: interviewContent } = await useFetch(
  `${config.public.kurocoApiDomain}/rcms-api/1/content/list?topics_group_id=10&cnt=6`,
  {
    credentials: 'include',
  }
);
topics = [];
data = interviewContent.value;
for (let key in data.list) {
  const item = data.list[key];
  let desc, thumb;
  if (item.contents) {
      desc = item.contents;
      desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
      if (desc.length > 100) {
          desc = desc.substring(0, 100);
          desc += '...';
      };
  };
  if (item.ext_1) {
      thumb = item.ext_1;
  };
  topics.push({
      date: item.ymd.substring(0, 10).replaceAll('-', '.'),
      title: item.subject,
      desc: desc,
      cat: item.contents_type_nm,
      id: item.topics_id,
      thumb: thumb + '?height=250',
  });
}
articleInterview.value = topics;

</script>