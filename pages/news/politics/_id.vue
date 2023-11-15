<template>
<section class="container-fluid l-content_maxWidth-lg">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

    <div class="l-page_content">
        <div class="l-breadcum">
            <!--<a href="/"><i aria-hidden="true" class="icon home item mdi mdi-home"></i></a>-->
            <!-- <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i> -->
            <a href="/" class="item">ホーム</a>
            <template v-if="pageName">
                <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
                <a :href="path" class="item">{{ pageName }}</a>
            </template>
            <template v-if="items.categoryUrl && items.category">
                <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
                <a :href="items.categoryUrl" class="item">{{ items.category }}</a>
            </template>
            <template v-if="items.title">
                <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
                <span class="item">{{ items.title }}</span>
            </template>
        </div>

        <section v-if="!items.title && contentChecked">
            <p class="text-center">Content not found</p>
        </section>
        <section v-else> 

            <section class="p-article_wrap">
                <div class="p-article_featureIMG">
                    <img v-if="items.featureIMG" :src="items.featureIMG" width="620" height="413">
                </div>

                <h1 class="p-heading mb-3">{{ items.title }}</h1>
                {{ items.date }}
                <a v-if="items.categoryUrl && items.category" :href="items.categoryUrl" class="c-btn c-btn_main c-btn_sm ml-4">{{ items.category }}</a>

                <div class="p-article_content" v-if="items.content" v-html="items.content"></div>
            </section>

            <Poll v-if="items.pollContent && items.pollContent.module_id" :contentPoll="poll" :pollID="items.pollContent.module_id" :topicID="items.topic_id"/>

            <SocialSharing/>

            <section class="p-article_nextprev">
                <div class="row">
                    <div class="col-6 text-left item" v-if="link_prev" @click="goTo(link_prev.url)">
                        <div class="row">
                            <div class="col-auto p-article_nextprev-arrow"><i aria-hidden="true" class="icon mdi mdi-chevron-left"></i></div>
                            <div class="col-3 thumb" v-if="link_prev.img" :style="{backgroundImage: 'url(' + link_prev.img + ')' }"></div>
                            <div class="col"><span class="link">{{ link_prev.title }}</span></div>
                        </div>
                    </div>
                    <div class="col-6 text-right item" v-if="link_next" @click="goTo(link_next.url)">
                        <div class="row">
                            <div class="col"><span class="link">{{ link_next.title }}</span></div>
                            <div class="col-3 thumb" v-if="link_next.img" :style="{backgroundImage: 'url(' + link_next.img + ')' }"></div>
                            <div class="col-auto p-article_nextprev-arrow"><i aria-hidden="true" class="icon mdi mdi-chevron-right"></i></div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="l-content_padding -lg pb-0 c-blog_list" v-if="relatedArticles.length > 0">
                <h2 class="c-heading_bg c-heading_h3">関連ニュース</h2>
                <div class="container">
                    <div class="row c-blog_list-item" v-for="item in relatedArticles" :key="item.id" @click="goTo(item.url)">
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
                    <a :href="path" class="c-btn c-btn_md c-btn_main-dark">ニュース記事一覧</a>
                </div>
            </div>
        </section>

    </div>

</section>
<Sidebar :contentRanking="ranking" :contentEBook="sidebarEbook" :contentAds="sidebarAds" :contentPR="sidebarPR"/>
</section><!--l-page_content-row-->
</section><!--container-fluid-->
</template>

<script>
import SocialSharing from '~/components/social_sharing.vue';
import Sidebar from '~/components/sidebar.vue';
import Poll from '~/components/poll.vue';
import item from '~/components/topic_detail';
export default {
    auth: false,
    components: {
        'v-item': item,
        SocialSharing,
        Sidebar,
        Poll
    },
    head() {
      return {
        title: this.metaTitle,
        meta: [
            {
                hid: 'og:title',
                property: 'og:title',
                content: this.metaTitle
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: this.metaURL,
            },
            {
                hid: 'description',
                name: 'description',
                content: this.metaDescription
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: this.metaDescription
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: this.metaOGImg
            },
            {
                hid: 'og:image:secure_url',
                property: 'og:image:secure_url',
                content: this.metaOGImg
            },
            {
                hid: 'og:image:url',
                property: 'og:image:url',
                content: this.metaOGImg
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                hid: 'twitter:title',
                name: 'twitter:title',
                content: this.metaTitle
            },
            {
                hid: 'twitter:description',
                name: 'twitter:description',
                content: this.metaDescription
            },
            {
                hid: 'twitter:image',
                name: 'twitter:image',
                content: this.metaOGImg
            },
        ]
      }
    },
    async asyncData({ app, payload, route }) {
        if (payload) {
            let thumbnail = payload.article.ext_1 ? payload.article.ext_1 : payload.apiDomain + '/files/user/og.jpg';
            let description = payload.article.contents.replace(/<[^>]+>/g, '').replace(/[\r\n]+/g, '');
            if (description.length > 120) {
                description = description.substring(0, 120) + '...';
            };
            // var SSGTopicsPreRender;
            // if (payload.article) {
            //     let items = [];
            //     let content = payload.article;

            //     if (content.ext_1) {
            //         items.featureIMG = content.ext_1;
            //     };
            //     if (content.contents) {
            //         items.content = content.contents;
            //     }; 

            //     items.category = content.contents_type_nm;
            //     items.categoryUrl = '/news/' + content.contents_type_slug;
            //     items.title = content.subject;
            //     items.topic_id = content.topics_id;
            //     if (content.ymd) {
            //         items.date = content.ymd.substring(0, 10).replace(/-/g, '.');
            //     } else {
            //         items.date = '';
            //     }
            //     items.pollContent = content.ext_3;
            //     SSGTopicsPreRender = items;
            // };
            return {
                SSGTopics: payload.article,
                // items: SSGTopicsPreRender,
                metaTitle: payload.article.subject,
                metaDescription: description,
                metaOGImg: thumbnail,
                metaURL: `${payload.siteURL}${route.fullPath}`,
                GAslug: route.params.id,
                apiDomain: payload.apiDomain,
                ranking: payload.contentRanking,
                sidebarEbook: payload.contentEbook,
                sidebarAds: payload.contentAds,
                sidebarPR: payload.contentPR,
                poll: payload.contentPoll,
            }
        };
    },
    data() {
        return {
            url: '',
            path: '/news/',
            GAslug: '',
            imageUrl: "",
            description: "",
            pageName: '',
            items: [
                {   
                    title: this.title,
                    category: '',
                    date: '',
                }
            ],
            ranking: [],
            sidebarEbook: [],
            sidebarAds: [],
            sidebarPR: [],
            loading: true,
            category: '',
            topic_slug: '',
            topic_id: '',
            topics_group_id: 1,
            link_next: '',
            link_prev: '',
            relatedArticles: '',
            contentChecked: false,
            SSGTopics: [],
            poll: []
        };
    },
    mounted() {
        //GA tracking dimension
        // const slug = this.$route.params.id;
        // this.$gtag.set({
        //     'page_title': 'Page View',
        //     'dimension1': slug
        // });

        // window.addEventListener('load', this.onPageLoad);
        if (process.browser) {
            var slug = this.GAslug ? this.GAslug : this.$route.params.id;
            this.$gtag('event', 'page_view', {
                'detail_page_slug': slug
                
            })
        };

        //Load content API
        if (this.SSGTopics.topics_id) {
            //Check if latest update available on today
            var storedArray = JSON.parse(sessionStorage.getItem('updateList'));
            if (storedArray && storedArray.length >= 1) {
                //If have latest update, load SPA for fresh content
                var hasUpdate = false;
                for (const key in storedArray) {
                    if (storedArray[key].id === this.SSGTopics.topics_id) {
                        hasUpdate = true;
                        break;
                    };
                };
                if (hasUpdate) {
                    this.url = window.location.href;
                    this.topic_slug = this.$route.params.id;
                    this.loading = true;
                    const url =
                    '/rcms-api/1/content/details/' +
                    this.topic_slug;
                    const self = this;
                    this.$store.$auth.ctx.$axios
                        .get(url)
                        .then(function (response) {
                            const items = [];
                            const content = response.data.details;

                            self.topicsDetails(content);
                        })
                        .catch(function (error) {
                            self.contentChecked = true;
                        });
                } else {
                    this.topicsDetails(this.SSGTopics);
                };
            } else {
                //If no latest update just display standard SSG
                this.topicsDetails(this.SSGTopics);
            };
        } else {
            //Normal SPA
            this.url = window.location.href;
            this.topic_slug = this.$route.params.id;
            this.loading = true;
            const url =
            '/rcms-api/1/content/details/' +
            this.topic_slug;
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    const items = [];
                    const content = response.data.details;

                    self.topicsDetails(content);
                })
                .catch(function (error) {
                    // self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                    // self.$store.dispatch('snackbar/snackOn');
                    self.contentChecked = true;
                });
        }
    },
    beforeDestroy() {
        // Remove the load event listener to prevent memory leaks
        //window.removeEventListener('load', this.onPageLoad);
    },
    methods: {
        // onPageLoad() {
        //     console.log('GA Set start');
        //     //GA tracking dimension
        //     var slug = this.GAslug ? this.GAslug : this.$route.params.id;
        //     this.$gtag.set({
        //         'page_title': 'page_view',
        //         custom_map: {
        //             'dimension1': slug
        //         }
        //     });
        //     console.log('GA Set done');
        // },
        goTo(url){
            // this.$router.push(url)
            window.location.href = url;
        },
        topicsDetails(content) {
            const self = this;
            const items = [];

            if (content.ext_1) {
                items.featureIMG = content.ext_1;
                self.imageUrl = content.ext_1;
            };
            if (content.contents) {
                items.content = content.contents;
                self.description = content.contents;
            }; 

            self.category = content.contents_type;
            items.category = content.contents_type_nm;
            items.categoryUrl = self.path  + content.contents_type_slug;
            items.title = content.subject;
            items.date = content.ymd
                .substring(0, 10)
                .replaceAll('-', '.');
            items.pollContent = content.questionnaire;
            
            self.pageName = content.group_nm;
            self.topic_slug = content.slug;
            self.topic_id = content.topics_id;
            self.items = items;
            self.loading = false;
            self.contentChecked = true;

            self.nextPrevLink();
            self.listArticles();
        },
        nextPrevLink() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=' + 
            this.topics_group_id +
            '&contents_type=' +
            this.category +
            '&cnt=1' +
            '&central_id=' +
            this.topic_id;
    
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    self.totalCnt = response.data.pageInfo.totalCnt;
                    const topics = [];
                    for (const key in response.data.list) {
                        const item = response.data.list[key];
                        let url = "";
                        let category = "";
                        if (item.contents_type_slug) {
                            category = item.contents_type_slug + '/';
                        };
                        if (item.slug) {
                            url = self.path + category + item.slug;
                        } else {
                            url = self.path + category + item.topics_id;
                        };
                        if (item.topics_id.toString() !== self.topic_id.toString() && item.slug.toString() !== self.topic_slug.toString()) {
                            if (!self.link_next && key == 0) {
                                let container = {};
                                container.title = item.subject;
                                container.id = item.topics_id;
                                container.img = item.ext_1;
                                container.url = url;
                                self.link_next = container;
                            } else {
                                let container = {};
                                container.title = item.subject;
                                container.id = item.topics_id;
                                container.img = item.ext_1;
                                container.url = url;
                                self.link_prev = container;
                            }
                        }
                    }
                })
                .catch(function (error) {
                    self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                    self.$store.dispatch('snackbar/snackOn');
                });
        },
        listArticles() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=1' +
            '&contents_type=' +
            this.category +
            '&cnt=10';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    self.totalCnt = response.data.pageInfo.totalCnt;
                    const topics = [];
                    for (let key in response.data.list) {
                        const item = response.data.list[key];
                        let desc, url;
                        if (item.contents) {
                            desc = item.contents;
                            if (desc.length > 100) {
                                desc = desc.substring(0, 100);
                            };
                        };
                        if (item.slug) {
                            url = '/news/' + item.contents_type_slug + '/' + item.slug;
                        } else {
                            url = '/news/' + item.contents_type_slug + '/' + item.topics_id;
                        };
                        topics.push({
                            date: item.ymd.substring(0, 10).replaceAll('-', '.'),
                            title: item.subject,
                            desc: desc,
                            cat: item.contents_type_nm,
                            catURL: self.path + item.contents_type_slug,
                            id: item.topics_id,
                            url: url,
                            thumb: item.ext_1,
                        });
                    }
                    self.relatedArticles = topics;
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        }
    },
};
</script>