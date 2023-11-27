<template>
<section class="p-page_blog l-content_maxWidth-lg l-container">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

    <div class="l-page_content">
      <div class="l-breadcum">
          <a href="/" class="item">ホーム</a>
          <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
          <span class="item">{{pageName}}</span>
      </div>

      <h1 class="p-heading">{{pageName}}</h1>
      
      <section class="container-fluid c-blog_list" v-if="topics.length > 0">
          <div class="row c-blog_list-item" v-for="item in topics" :key="item.id" @click="goTo(item.url)">
              <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
              <div class="col">
                  <h3>{{ item.title }}</h3>
                  <div class="mb-3">
                      <span class="date">{{ item.date }}</span>
                      <!-- <span class="label c-label">{{ item.cat }}</span> -->
                      <a :href="item.catURL"><span class="label c-label c-label_clickable">{{ item.cat }}</span></a>
                  </div>
                  <p>{{ item.desc }}</p>
              </div>
          </div>
      </section>
      <section v-else-if="contentChecked && !topics.length">
          <p class="text-center">Sorry, content is coming soon, please come back later.</p>
      </section>

      <div class="c-pagination">
          <v-pagination v-if="Math.ceil(totalCnt / perPage) > 1"
                        v-model="page"
                        :length="Math.ceil(totalCnt / perPage)"
                        :total-visible="totalVisible"
                        @input="next"
          />
      </div>

      <v-pagination
      v-model="page2"
      :length="4"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>

    </div>
    
</section>
</section>
</section>
</template>

<script setup>
import { ref, computed } from 'vue';

const page2 = 1;

//Get category name from URL path
const route = useRoute();
var pathSegments = route.path.split("/"); // Split the path using "/"
pathSegments = pathSegments.filter(function(segment) { // Filter out any empty segments
    return segment !== '';
});
var catName = pathSegments[pathSegments.length - 1]; // Get the last path

//Content logic
const { data: news } = await useFetch(
  `https://mtown-vercel.g.kuroco.app/rcms-api/1/content/list?contents_type=${catName}`,
  {
    credentials: 'include',
  }
);
const topics = [];
var pageName;
var contentChecked = false;
if (news) {
  const content = news.value;
  pageName = content.list[0].group_nm;
  contentChecked = true;
  
  for (let key in content.list) {
      const item = content.list[key];
      let url;
      let desc = item.contents;
      let catURL = item.category_parent_id ? '/news/' + item.contents_type_slug : '/news/';
      desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
      if (desc.length > 120) {
          desc = desc.substring(0, 120);
          desc += '...';
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
          thumb: item.ext_1,
      });
  };
};


//Link function
const goTo = (url) => {
    window.location.href = url;
};
// import { useRouter } from 'nuxt/router';
// const goTo = (url) => {
//   const router = useRouter();
//   router.push(url);
// };


//Pagination
const page = ref(1);
const perPage = 20;
const totalCnt = ref(0);
const paginationMax = 15;
const paginationMin = 8;

const totalVisible = computed(() => {
  return import.meta.env.VITE_IS_SMALL_SCREEN ? paginationMin : paginationMax;
});

// const axios = useAxios();

const next = async () => {
  await updateBlog();
};

const updateBlog = async () => {
  console.log('execute');
};



</script>