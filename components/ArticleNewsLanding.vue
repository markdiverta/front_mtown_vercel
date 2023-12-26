<template>
    <section>
      
      <div class="l-breadcum">
          <a href="/" class="item">ホーム</a>
          <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
          <span class="item">{{pageName}}</span>
      </div>

      <h1 class="p-heading">{{pageName}}</h1>

      <section v-if="topics[0].title">
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

        <UPagination 
            v-model="page" 
            :page-count="pageCount" 
            :total="pagiTotal" 
            :max="maxDisplayBtn"
            :active-button="{ color: 'red' }"
            class="c-pagination"
          />

      </section>
      <section v-else-if="contentChecked && !topics.length">
          <p class="text-center">Sorry, content is coming soon, please come back later.</p>
      </section>

    </section>
</template>

<script setup>
const props = defineProps(['catSlug', 'apiURLBase', 'apiURL']);
const catSlugProps = ref(props.catSlug);
const catSlug = catSlugProps.value
const apiURLBase = ref(props.apiURLBase);
const apiURL = ref(props.apiURL);

var pageName;
var contentChecked = false;
const topics = ref('[]');

//Pagination setting
const page = ref(1)
const pagiTotal = ref('');
const maxDisplayBtn = 10;
const pageCount = computed(() => { //Trigger for pagination
  apiURL.value = apiURL.value.includes('?') ? apiURLBase.value + '&pageID=' + page.value : apiURLBase.value + '?pageID=' + page.value;
  console.log(apiURL.value);
  fetchData(apiURL.value); //Reload API function
  scrollToTop();
  return '20';
});

//Pagination scroll to top function
const scrollToTop = () => {
  if (process.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: animated smooth scroll
    });
  };
};

//Link function
const goTo = (url) => {
    window.location.href = url;
};

//API Content Function
async function fetchData(url) {
  try {
    apiURL.value = url ? url : apiURL.value; 
    const response = await fetch(apiURL.value, {
      credentials: 'include',
    });
    const newsData = await response.json(); //Convert to json to use on content structuring

    if (newsData) {
        let list = topics.value ? [] : topics.value;
        pagiTotal.value = newsData.pageInfo.totalCnt;
        const content = newsData;
        pageName = content.list[0].group_nm;
        contentChecked = true;
        for (let key in content.list) {
            const item = content.list[key];
            let url;
            let desc = item.contents;
            let catURL = item.category_parent_id ? catSlug + item.contents_type_slug : catSlug;
            desc = desc ? desc.replace(/<[^>]+>/g, '') : ''; //remove HTML
            if (desc && desc.length > 120) {
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
            list.push({
                date: item.ymd ? item.ymd.substring(0, 10).replaceAll('-', '.') : '',
                title: item.subject,
                desc: desc,
                cat: item.contents_type_nm,
                catURL: catURL,
                id: item.topics_id,
                url: url,
                thumb: item.ext_1,
            });
        };
        topics.value = list;
    };
  } catch (error) {
    // handle errors here
    console.error('Error in fetchData:', error);
  }
};

// Innitial API Content Function calling
fetchData();

</script>
