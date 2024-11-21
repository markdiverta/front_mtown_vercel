<template>

<section class="p-page_blog l-content_maxWidth-lg l-container">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

    <div class="l-page_content">

      <div class="l-breadcum">
            <a href="/" class="item">ホーム</a>
            <template v-if="parentCat">
                <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
                <a :href="catSlug" class="item">{{parentCat}}</a>
            </template>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <span class="item">{{pageName}}</span>
      </div>

      <h1 class="p-heading">{{pageName}}</h1>
    
      <UProgress animation="carousel" v-if="!contentChecked" size="sm" class="c-loadingbar"/>

      <section v-if="topics[0].title">

        <section class="container-fluid p-comics_list">
            <div class="row">
                <div class="col-md-4 col-sm-6 col-12 item" v-for="item in topics" :key="item.id" @click="goTo(item.url)">
                    <img :src="item.thumb">
                </div>
            </div>
        </section>

        <UPagination
            v-if="pagiCount > 1"
            v-model="page" 
            :page-count="pageCount" 
            :total="pagiTotal" 
            :max="maxDisplayBtn"
            :active-button="{ color: 'red' }"
            class="c-pagination"
          />

      </section>
      <section v-else-if="contentChecked && !topics.length || contentChecked">
        
        <p class="text-center">Sorry, content not found or is coming soon, please come back later.</p>
            
      </section>

    </div>
    
</section>

<Sidebar/>

</section>
</section>
<PageMeta v-if="catAPILoaded" :apiContent="catAPIContent"/>
</template>

<script setup>
//Global setting
const config = useRuntimeConfig(); //API route
const catSlug = '/backnumber/';
const topicID = '15';
const pageCnt = '15';


//Get category name from URL path
const route = useRoute();
var pathSegments = route.path.split("/"); // Split the path using "/"
pathSegments = pathSegments.filter(function(segment) { // Filter out any empty segments
    return segment !== '';
});
var catName = pathSegments[pathSegments.length - 1]; // Get the last path


//API Content setting
var pageName;
var parentCat;
const apiURLBase = ref(`${config.public.kurocoApiDomain}/rcms-api/1/content/list?topics_group_id=${topicID}&cnt=${pageCnt}`);
const apiURL = ref(apiURLBase.value);
const topics = ref('[]');
const contentChecked = ref(false);
const searchNotFound = ref(false);

//Pagination setting
const page = ref(1)
const pagiTotal = ref('');
const pagiCount = ref('');
const maxDisplayBtn = 10;
const pageCount = computed(() => { //Trigger for pagination
  apiURL.value = apiURL.value.includes('?') ? apiURLBase.value + '&pageID=' + page.value : apiURLBase.value + '?pageID=' + page.value;
  fetchData(apiURL.value); //Reload API function
  scrollToTop();
  return pageCnt;
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
import { useRouter } from 'vue-router';
const router = useRouter();
const goTo = (url) => {
    router.push(url);
};

//API Content Function
async function fetchData(url) {
  try {
    apiURL.value = url ? url : apiURL.value; 
    const response = await fetch(apiURL.value, {
      credentials: 'include',
    });
    const newsData = await response.json(); //Convert to json to use on content structuring
    if (newsData.list && newsData.list.length < 1) {
        searchNotFound.value = isSearch ? true : false;
        contentChecked.value = true;
    }
    else if (newsData) {
        let list = topics.value ? [] : topics.value;
        pagiTotal.value = newsData.pageInfo.totalCnt;
        pagiCount.value = newsData.pageInfo.totalPageCnt;
        const content = newsData;
        pageName = pageName ? pageName : (content.list[0].contents_type_nm ? content.list[0].contents_type_nm : content.list[0].group_nm);
        parentCat = content.list[0].group_nm ? content.list[0].group_nm : '';
        contentChecked.value = true;

        console.log(newsData);

        for (let key in content.list) {
            const item = content.list[key];
            let url, thumb;
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
            console.log(item.ext_2);
            //Thumbnail check (For backnumber it is ext_2 for cover photo while ext_1 for sub-pages, if ext_2 is empty, then use ext_1)
            if (item.ext_2?.url && item.ext_2?.url.includes('http') || item.ext_2 && item.ext_2.includes('http')) {
                thumb = item.ext_2.url ? item.ext_2.url : item.ext_2;
            }
            else if (item.ext_1[0].url && item.ext_1[0]?.url.includes('http') || item.ext_1[0] && item.ext_1[0].includes('http')) {
                thumb = item.ext_1[0].url ? item.ext_1[0].url : item.ext_1[0];
            };

            // if (item.ext_2 && item.ext_2?.url?.includes('http://') || item.ext_2?.url && item.ext_2?.url?.includes('https://') ) {
            //     thumb = item.ext_2.url;
            // }
            // else if (item.ext_1[0] && item.ext_1[0]?.includes('http://') || item.ext_1[0] && item.ext_1[0]?.includes('https://') ) {
            //     thumb = item.ext_1[0];
            // };
            list.push({
                date: item.ymd ? item.ymd.substring(0, 10).replaceAll('-', '.') : '',
                title: item.subject,
                desc: desc,
                cat: item.contents_type_nm,
                catURL: catURL,
                id: item.topics_id,
                url: url,
                thumb: thumb + '?width=350',
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