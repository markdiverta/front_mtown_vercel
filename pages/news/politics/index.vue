<template>
<section class="p-article l-content_maxWidth-lg l-container">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

    <div class="l-page_content">

        <div class="l-breadcum">
            <!--<a href="/"><i aria-hidden="true" class="icon home item mdi mdi-home"></i></a>-->
            <!-- <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i> -->
            <a href="/" class="item">ホーム</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <span class="item">{{pageParentName}}</span>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <span class="item">{{pageName}}</span>
        </div>

        {{response2.details.contents}}

        <!-- <article class="c-article">
        <div class="l-container--large l-container--contents">
            <div v-html="response2.details.contents"></div>
        </div>
        </article> -->

    </div>

</section>
<!-- <Sidebar :contentRanking="ranking" :contentEBook="sidebarEbook" :contentAds="sidebarAds" :contentPR="sidebarPR"/> -->
</section><!--l-page_content-row-->
</section><!--container-fluid-->
</template>

<script>
console.log('enter');
export default {
  data() {
    return {
      response2: ''
    };
  },
  head() {
      return {
        title: 'testing title',
        meta: [
             {
                hid: 'og:title',
                property: 'og:title',
                content: 'testing title',
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: 'testing URL',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'testing DESCRIPTION',
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: 'testing DESCRIPTION',
            },
        ]
      }
    },
    async mounted() {
        console.log('enter 2');
        try {
            const response = await fetch('https://dev-mtown.g.kuroco.app/rcms-api/1/content/details/saujana-villa-condominium');
            const data = await response.json();
            this.response2 = data;
            console.log(data);
        } catch (error) {
            console.error('Error fetching data from API', error);
        }
    }
};
</script>
