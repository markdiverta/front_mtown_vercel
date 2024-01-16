<template>
  <section class="l-content_maxWidth-lg">
  <section class="row l-page_content-row">
  <section class="col-md-9 col-12" fluid>

    <div class="l-page_content">
      
        carousel testing
        <Carousel v-bind="settings" :breakpoints="breakpoints">
            <Slide v-for="slide in 10" :key="slide">
            <div class="carousel__item">{{ slide }}</div>
            </Slide>

            <template #addons>
            <Navigation />
            </template>
        </Carousel>
      
        <!-- <template v-if="ssgCarousel && ssgCarousel.length > 0"> -->
            <!-- <carousel class="c-carousel_ssg c-carousel l-content_padding -xs pb-0" 
                :autoplay="true" :nav="false" :dots="false" :loop="true" navClass=""
            >
                <div v-for="(slide, index) in articleCarousel" :key="index" @click="goTo(slide.url)" class="c-carousel_slide" :style="{backgroundImage: 'url(' + slide.thumb + ')' }">
                    <span class="c-carousel_title">{{slide.title}}</span>
                </div>
                <template slot="prev"><i aria-hidden="true" class="c-carousel_nav nav-prev v-icon mdi mdi-chevron-left"></i></template>
                <template slot="next"><i aria-hidden="true" class="c-carousel_nav nav-next v-icon mdi mdi-chevron-right"></i></template>
            </carousel> -->

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

//======== Carousel
import { ref } from 'vue'
import 'vue3-carousel/dist/carousel.css'

// carousel settings
const settings = ref({
  itemsToShow: 1,
  snapAlign: 'center',
})

const breakpoints = ref({
  700: {
    itemsToShow: 3.5,
    snapAlign: 'center',
  },
  1024: {
    itemsToShow: 5,
    snapAlign: 'start',
  },
})

// const articleCarousel = ref({});

// try {
//   const { data: carouselContent } = await useFetch(
//     `${config.public.kurocoApiDomain}/rcms-api/1/content/details/47640`,
//     {
//       credentials: 'include',
//     }
//   );

//   if (carouselContent && carouselContent.value) {
//     const carousel = [];
//     const fetchedData = carouselContent.value;

//     for (let key in fetchedData.list) {
//       const item = fetchedData.list[key];
//       let title = item.title;
//       carousel.push({
//         title: title,
//         url: item.url,
//         thumb: fetchedData.list.ext_6[key],
//       });
//     }

//     articleCarousel.value = carousel;
//   }
// } catch (error) {
//   console.error('Error fetching carousel content:', error);
// }

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

<!-- <style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style> -->
