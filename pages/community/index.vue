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
        
        <section class="c-search_bar l-content_margin-btm l-content_margin-top">
        <UForm class="c-form row">
            <div class="col-md-4 col">
                <UInput
                    type="text"
                    placeholder="キーワードを入力"
                    class="l-header_top-search v-input"
                    variant="none"
                    name="keyword"
                    v-model="keyword"
                />
            </div>
            <div class="col-md-4 col">
                <USelect
                    type="text"
                    :options="categoryOptions"
                    option-attribute="name"
                    variant="none"
                    class="l-header_top-search v-input"
                    name="category"
                    v-model="category"
                />
            </div>
            <div class="col-auto pt-1">
                <button
                    type="submit"
                    block
                    class="c-btn c-btn_main c-btn_md"
                    @click.prevent="search"
                >
                    検索
                </button>
            </div>
        </UForm>
        </section>

        <UProgress animation="carousel" v-if="!contentChecked" size="sm" class="c-loadingbar"/>
       
        <section v-if="!searchNotFound && topics[0].title">
            <section class="container-fluid c-blog_list --list_2col">
                <div class="row">
                    <div class="col-md-4 col-sm-6 col-12 c-blog_list-item" v-for="item in topics" :key="item.id" @click="goTo(item.url)">
                        <div>
                            <h3 class="heading">{{ item.title }}</h3>
                            <div class="mb-3">
                                <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                            </div>
                            <div v-if="item.desc" v-html="item.desc"></div>
                        </div>
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
        <section v-else-if="searchNotFound || contentChecked && !topics.length">
            <p class="text-center">Couldn't find any content. Please try searching for different keywords.</p>
        </section>

    </div>
    
</section>

<Sidebar/>

</section>
</section>

</template>

<script setup>
//Global setting
const config = useRuntimeConfig(); //API route
const catSlug = '/community/';
const topicID = '12';
const pageCnt = '30';

//Get category name from URL path
const route = useRoute();
var pathSegments = route.path.split("/"); // Split the path using "/"
pathSegments = pathSegments.filter(function(segment) { // Filter out any empty segments
    return segment !== '';
});
var catName = pathSegments[pathSegments.length - 1]; // Get the last path

//API Content setting
const apiURLBase = ref(`${config.public.kurocoApiDomain}/rcms-api/1/content/list?topics_group_id=${topicID}&cnt=${pageCnt}`);
const apiURL = ref(apiURLBase.value);
var pageName = "サークル・コミュニティをみる/参加する";
const contentChecked = ref(false);
const searchNotFound = ref(false);
const topics = ref('[]');

//Pagination setting
const page = ref(1)
const pagiTotal = ref('');
const pagiCount = ref('');
const maxDisplayBtn = 10;
const pageCount = computed(() => { //Trigger for pagination
  if (searchAPI.value) {
    apiURL.value = searchAPI.value + '&pageID=' + page.value;
  } else {
    apiURL.value = apiURL.value.includes('?') ? apiURLBase.value + '&pageID=' + page.value : apiURLBase.value + '?pageID=' + page.value;
  };
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

//Form setting
const keyword = ref('');
const category = ref('');
const categoryOptions = [{value: '', name: 'ALL'}];

const formSelectAPI = ref(`${config.public.kurocoApiDomain}/rcms-api/1/content/category?topics_group_id=${topicID}`);
var catResponse = await fetch(formSelectAPI.value, {
    credentials: 'include',
});
const catResponseData = await catResponse.json();
if (catResponseData) {
    for (const key in catResponseData.list) {
        const item = catResponseData.list[key];
        categoryOptions.push({
            value: item.topics_category_id,
            name: item.category_nm,
        });
    }
}

//Search trigger
const searchAPI = ref('');
async function search(data) {
    searchAPI.value = apiURLBase.value;
    searchAPI.value += keyword.value ? '&topics_keyword=' + keyword.value : '';
    searchAPI.value += category.value ? '&contents_type=' + category.value : '';
    fetchData(searchAPI.value);
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
    if (newsData && newsData.list.length > 0) {
        let list = topics.value ? [] : topics.value;
        pagiTotal.value = newsData.pageInfo.totalCnt;
        pagiCount.value = newsData.pageInfo.totalPageCnt;
        const content = newsData;
        // pageName = content.list[0].group_nm;
        contentChecked.value = true;
        searchNotFound.value = false;
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
    } else {
        contentChecked.value = true;
        searchNotFound.value = true;
    }
  } catch (error) {
    // handle errors here
    console.error('Error in fetchData:', error);
  }
};

// Innitial API Content Function calling
fetchData();
</script>