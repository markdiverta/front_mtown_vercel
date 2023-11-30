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


      <!-- <UPagination v-model="page" :page-count="5" :total="items.length" /> -->

      <UPagination
        v-if="Math.ceil(totalNews / itemsPerPage) > 1"
        v-model="currentPage"
        :length="Math.ceil(totalNews / itemsPerPage)"
        :total-visible="paginationTotalVisible"
        @input="loadPage"
      />


      <!-- <v-pagination v-if="Math.ceil(totalCnt / perPage) > 1"
                          v-model="page"
                          :length="Math.ceil(totalCnt / perPage)"
                          :total-visible="totalVisible"
                          @input="next"
            /> -->

    </div>
    
</section>

<Sidebar/>

</section>
</section>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Sidebar from '~/components/sidebar.vue';

const itemsPerPage = 30; // Number of items to show per page
const currentPage = ref(1);
const totalNews = ref(0);
const paginationTotalVisible = ref(5); // Adjust the number of visible pagination items

const pagee = ref(1)
const items = ref(Array(55))

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
  'https://mtown-vercel.g.kuroco.app/rcms-api/1/content/list',
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

      if (desc) {
          desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
      };
      if (desc && desc.length > 120) {
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

// Function to paginate the list of news
const paginateNews = () => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return topics.slice(startIndex, endIndex);
};

// Function to load a specific page
const loadPage = () => {
  // Perform any additional logic if needed
  // For example, fetch data for the selected page
  // Update the displayed news based on the response
};

// Update the total news count after fetching
onMounted(() => {
  totalNews.value = topics.length;
});

// Watch for changes in the currentPage and update the displayed news accordingly
import { watch } from 'vue';
watch(currentPage, () => {
  loadPage();
});

const paginatedNews = ref(paginateNews());

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