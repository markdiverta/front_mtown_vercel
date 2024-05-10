<template>
    <section>

      <div class="l-breadcum">
          <a href="/" class="item">ホーム</a>
          <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
          <span class="item">{{pageName}}</span>
      </div>

      <h1 class="p-heading">{{pageName}}</h1>

      <UProgress animation="carousel" v-if="!contentChecked" size="sm" class="c-loadingbar"/>
      
      <section v-if="topics[0].title">
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
    <PageMeta v-if="catAPILoaded" :apiContent="catAPIContent"/>
</template>

<script setup>
console.log('test component start');

import { useRouter } from 'vue-router';
const router = useRouter();
const config = useRuntimeConfig(); //API route

const props = defineProps(['catSlug', 'apiURLBase', 'apiURL']);
const catSlugProps = ref(props.catSlug);
const catSlug = catSlugProps.value
const apiURLBase = ref(props.apiURLBase);
const apiURL = ref(props.apiURL);

var pageName, url;
var contentChecked = false;
const topics = ref('[]');

//Pagination setting
const page = ref(1)
const pagiTotal = ref('');
const maxDisplayBtn = 10;
const pageCount = computed(() => { //Trigger for pagination
  apiURL.value = apiURL.value.includes('?') ? apiURLBase.value + '&pageID=' + page.value : apiURLBase.value + '?pageID=' + page.value;
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
    // window.location.href = url;
    router.push(url);
};

//API Content for server
apiURL.value = url ? url : apiURL.value; 
const response = await fetch(apiURL.value, {
    credentials: 'include',
});
const newsData = await response.json(); //Convert to json to use on content structuring

if (newsData) {
    let list = topics.value ? [] : topics.value;
    pagiTotal.value = newsData.pageInfo.totalCnt;
    const content = newsData;
    if (!pageName) { //In case page name already set in server meta
        pageName = content.list[0].group_nm;
    };
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
    topics.value = list;
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
        if (!pageName) { //In case page name already set in server meta
            pageName = content.list[0].group_nm;
        };
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
        topics.value = list;
    };
  } catch (error) {
    // handle errors here
    console.error('Error in fetchData:', error);
  }
};

//Get Category info for custom meta & page title setup
var catAPIGroupID;
const catAPIContent = ref('');
const catAPILoaded = ref(false);
if (apiURLBase.value.includes('topics_group_id=')) { //Get topics ID
    let locate = apiURLBase.value.indexOf('topics_group_id=');
    let textCount = 'topics_group_id='.length;
    catAPIGroupID = apiURLBase.value.slice(locate+textCount, 99);

    //In case URL last parameter is not topics_group_id
    if (catAPIGroupID.includes('&')) {
        let locate = catAPIGroupID.indexOf('&');
        catAPIGroupID = catAPIGroupID.slice(0, locate);
    };
}
try { //Not using async function as it run on frontend, this need run on backend for meta setting
    const { data: news } = await useFetch(
        `${config.public.kurocoApiDomain}/rcms-api/1/content/category?topics_group_id=${catAPIGroupID}`,
        {
            credentials: 'include',
        }
    );
    const urlData = router ? router.currentRoute.value : '';
    if (news.value.list) {
        let content = news.value.list;
        for (let key in content) {
            //Check if API slug match URL address param / category name or parent name (without category)
            if (
            urlData.params.category == content[key].slug || //For news subcategory
            urlData.name == content[key].slug || 
            catAPIGroupID == content[key].topics_group_id //For eat topics group etc
            ) {
                if (content[key].ext_col_01 || content[key].ext_col_02 || content[key].ext_col_03) {
                    if (content[key].ext_col_01) {
                        pageName = content[key].ext_col_01;
                    };
                    catAPIContent.value = content[key];
                    break;
                }
            }
        }
        catAPILoaded.value = true;
    };
} catch (error) {
  console.error('An error occurred while fetching data:', error);
}

</script>
