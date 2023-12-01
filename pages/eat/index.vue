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

      <section v-if="topics.length > 0">
          <section class="container-fluid c-blog_list --list_2col">
              <div class="row">
                  <template v-for="(item, index) in topics" :key="item.id">
                  <div class="col-sm-6 col-12 c-blog_list-item" v-if="index < 8" @click="goTo(item.url)">
                      <div class="thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + '?width=400)' } : ''"></div>
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
          <section class="container-fluid mt-4 c-blog_list" v-if="topics.length > 9">
              <template v-for="(item, index) in topics" :key="item.id">
              <div class="row c-blog_list-item" v-if="index > 7" :key="item.id" @click="goTo(item.url)">
                  <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + '?width=250)' } : ''"></div>
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
      </section>
      <section v-else-if="contentChecked && !topics.length">
          <p class="text-center">Sorry, content is coming soon, please come back later.</p>
      </section>

    </div>
    
</section>

<Sidebar/>

</section>
</section>

</template>

<script setup>
import Sidebar from '~/components/sidebar.vue';

//Global setting
const config = useRuntimeConfig(); //API route
const catSlug = '/eat/';

//Get category name from URL path
const route = useRoute();
var pathSegments = route.path.split("/"); // Split the path using "/"
pathSegments = pathSegments.filter(function(segment) { // Filter out any empty segments
    return segment !== '';
});
var catName = pathSegments[pathSegments.length - 1]; // Get the last path

//Content logic
const { data: news } = await useFetch(
  `${config.public.kurocoApiDomain}/rcms-api/1/content/list?topics_group_id=7`,
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
      let catURL = item.category_parent_id ? catSlug + item.contents_type_slug : catSlug;
      desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
      if (desc.length > 120) {
          desc = desc.substring(0, 120);
          desc += '...';
      };

      //Check if has child category or just parent category
      if (item.contents_type_slug && item.category_parent_id) {
          url = catSlug + item.contents_type_slug + '/';
      } else {
          url = catSlug;
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


</script>