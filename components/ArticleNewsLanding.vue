<template>
    <section>

    <TestingParent/>

      <PageMeta/>

        <h1>{{ sharedState.pageTitle }}</h1>
      
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

        <section class="container-fluid c-blog_list" v-if="topics.length > 0">
            <div class="row c-blog_list-item" v-for="item in topics" :key="item.id" @click="goTo(item.url)">
                <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb  + '?width=300)' } : ''"></div>
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
            v-if="pagiCount > 1"
            v-model="page" 
            :page-count="pageCount" 
            :total="pagiTotal" 
            :max="maxDisplayBtn"
            :active-button="{ color: 'red' }"
            class="c-pagination"
          />

      </section>
      <section v-else-if="searchNotFound || contentChecked && !topics.length || contentChecked">
          
            <template v-if="searchNotFound">
                <p class="text-center">Couldn't find any content. Please try searching for different keywords.</p>
                <form class="c-form row pt-4" action="/search">
                    <div class="col-auto ml-auto">
                        <input
                            type="text"
                            placeholder="ニュース検索　例：マレーシア Covid-19 感染者数"
                            class="l-header_top-search v-input"
                            outlined
                            name="keyword"
                            v-model="keyword"
                        />
                    </div>
                    <div class="col-auto mr-auto">
                        <button
                            type="submit"
                            block
                            class="c-btn_main-dark c-btn submit-btn"
                        >
                            検索
                        </button>
                    </div>
                </form>
            </template>
            <template v-else>
                <p class="text-center">Sorry, content not found or is coming soon, please come back later.</p>
            </template>
            
      </section>

    </section>
</template>

<script setup>
import { provide, ref } from 'vue';

const sharedState = ref({
  pageTitle: 'Heading',
});

provide('sharedState', sharedState);


const props = defineProps(['catSlug', 'apiURLBase', 'apiURL', 'isSearch', 'catName']);
const catSlugProps = ref(props.catSlug);
const catSlug = catSlugProps.value
const apiURLBase = ref(props.apiURLBase);
const apiURL = ref(props.apiURL);
const isSearchProps = ref(props.isSearch);
const isSearch = isSearchProps.value
const isSubCategoryProps = ref(props.catName);
const isSubCategory = isSubCategoryProps.value

var pageName, parentCat;
const contentChecked = ref(false);
const searchNotFound = ref(false);
const topics = ref('[]');

//Pagination setting
const page = ref(1)
const pagiTotal = ref('');
const pagiCount = ref('');
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
    if (newsData.list && newsData.list.length < 1) {
        searchNotFound.value = isSearch ? true : false;
        contentChecked.value = true;
    }
    else if (newsData) {
        let list = topics.value ? [] : topics.value;
        pagiTotal.value = newsData.pageInfo.totalCnt;
        pagiCount.value = newsData.pageInfo.totalPageCnt;
        const content = newsData;
        pageName = isSubCategory ? content.list[0].contents_type_nm : content.list[0].group_nm;
        parentCat = isSubCategory ? content.list[0].group_nm : '';

        contentChecked.value = true;
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
            //Thumbnail check
            if (item.ext_1 && item.ext_1.includes('http://') || item.ext_1 && item.ext_1.includes('https://') ) {
                thumb = item.ext_1;
            } else if (item.ext_2 && item.ext_2.includes('http://') || item.ext_2 && item.ext_2.includes('https://') ) {
                thumb = item.ext_2;
            };
            //For search page only
            if (isSearch) {
                let path;
                if (item.topics_group_id) {
                    let parentID = item.topics_group_id;
                    path = parentID == '1' ? '/news/'
                        : parentID == '7' ? '/eat/'
                        : parentID == '8' ? '/life/'
                        : parentID == '9' ? '/feature/'
                        : parentID == '10' ? '/interview/'
                        : parentID == '11' ? '/comics/'
                        : parentID == '12' ? '/community/'
                        : parentID == '13' ? '/malaysia-profiles/'
                        : parentID == '14' ? '/j-league/'
                        : parentID == '15' ? '/backnumber/'
                        : '';
                };
                if (path == '/news/') {
                    url = item.contents_type_slug ? path + item.contents_type_slug + '/' : path + 'uncategories/';
                } else {
                    url = path;
                    catURL = path; //No category in others topics except news
                };
                url = item.slug ? url + item.slug : url + item.topics_id;
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
