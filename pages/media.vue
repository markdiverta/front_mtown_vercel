<template>
  <section class="l-content_maxWidth-lg l-content_padding -xs l-container">

    <div class="l-breadcum">
        <!--<a href="/"><i aria-hidden="true" class="icon home item mdi mdi-home"></i></a>-->
        <!-- <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i> -->
        <a href="/" class="item">ホーム</a>
        <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
        <span class="item">{{pageName}}</span>
    </div>

    <h1 class="p-heading">{{pageName}}</h1>
    
    <div class="row c-block">
        <div class="col-sm-4 col-6">
            <div class="c-block_item --withButton">
                <div class="c-block_thumb">
                    <img src="https://dev-mtown.g.kuroco-img.app/files/user/klgourmesian-logo-alt-768x80.png" alt="klgourmesian-logo">
                </div>
                <h2 class="heading">グルメシアン Gourmesian</h2>
                <p>マレーシアに住んでいる方/訪れている方のためのレストラン情報サイト「Gourmesian」はマレーシア国内にあるレストラン情報を多数掲載中！ 料理のジャンルや予算、エリア、クーポンのあるお店などの条件から、用途に合わせてベストなお店を検索できます！</p>
                <a class="c-block_link c-btn c-btn_main" href="https://gourmesian.com/" target="_blank">サイトを見る</a>
            </div>
        </div>
        <div class="col-sm-4 col-6">
            <div class="c-block_item --withButton">
                <div class="c-block_thumb">
                    <img src="https://dev-mtown.g.kuroco-img.app/files/user/logo2.png">
                </div>
                <h2 class="heading">マレーシア生活情報サイト MTownlife.my</h2>
                <p>マレーシアの基礎情報をはじめ、現地への渡航情報や交通情報、就職、ショッピング、グルメ、医療・美容情報などマレーシアで暮らすための生活情報が満載！</p>
                <a class="c-block_link c-btn c-btn_main" href="https://malaysialife.mtown.my/" target="_blank">サイトを見る</a>
            </div>
        </div>
        <div class="col-sm-4 col-6">
            <div class="c-block_item --withButton">
                <div class="c-block_thumb">
                    <img src="https://dev-mtown.g.kuroco-img.app/files/user/logo1-1.png">
                </div>
                <h2 class="heading">マレーシア ビジネス交流サイト『CONNECTION』｜ビジネス情報源</h2>
                <p>マレーシア進出日系企業のビジネス　コネクション作りをサポート！マレーシア進出の事前リサーチ、会社設立、人材採用、人事労務、ITサービス導入、事業拡大など各フェーズで有益な情報・知識を発信いたします。</p>
                <a class="c-block_link c-btn c-btn_main" href="https://connection.com.my/" target="_blank">サイトを見る</a>
            </div>
        </div>
    </div>

  </section>
</template>

<script setup>
//Global setting
const config = useRuntimeConfig(); //API route
const pageName = '関連メディア';

//Link function
const goTo = (url) => {
    window.location.href = url;
};

</script>
