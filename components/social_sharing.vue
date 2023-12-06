<template>
    <div class="p-article_share l-content_padding -sm">

        <a href="#" class="c-btn c-btn_social --icon c-btn_twitter" @click.prevent="tweetOnTwitterURL" rel="nofollow noopener">
            <i class="icon mdi mdi-twitter"></i>
            Tweet
        </a>
        <!-- <a href="#" class="c-btn c-btn_social --icon c-btn_twitter" @click.prevent="tweetOnTwitter2" rel="nofollow noopener">Tweet</a> -->
        <a href="#" class="c-btn c-btn_social --icon c-btn_fb" @click.prevent="shareOnFacebook" rel="nofollow noopener">
            <i class="icon mdi mdi-facebook"></i>
            Share
        </a>
        <!-- <a href="#" class="c-btn c-btn_social c-btn_hatena" @click.prevent="shareOnHatena">Hatena</a>
        <a href="#" class="c-btn c-btn_social --icon c-btn_pocket" @click.prevent="saveToPocket">Pocket</a>
        <a href="#" class="c-btn c-btn_social --icon c-btn_rss" @click.prevent="subscribeToRSS">RSS</a>
        <a href="#" class="c-btn c-btn_social c-btn_feedly" @click.prevent="subscribeOnFeedly">Feedly</a>
        <a href="#" class="c-btn c-btn_social --icon c-btn_pinterest" @click.prevent="pinOnPinterest">Pin it</a> -->
    </div> 
</template>

<script setup>
import { ref, onMounted } from 'vue';

const title = ref('');
const url = ref('');

onMounted(() => {
  url.value = window.location.href;
  title.value = document.title;
});

const shareOnFacebook = () => {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url.value)}`;
  window.open(shareUrl, "facebook-share-dialog", "width=626,height=436");
};

const shareOnHatena = () => {
  const hatenaUrl = `https://b.hatena.ne.jp/add?mode=confirm&url=${encodeURIComponent(url.value)}&title=${encodeURIComponent(title.value)}`;
  window.open(hatenaUrl, "hatena-bookmark-dialog", "width=550,height=420");
};

const saveToPocket = () => {
  const pocketUrl = `https://getpocket.com/edit?url=${encodeURIComponent(url.value)}`;
  window.open(pocketUrl, "pocket-bookmark-dialog", "width=350,height=550");
};

const subscribeToRSS = () => {
  const rssUrl = "https://example.com/feed/";
  window.open(rssUrl, "rss-subscribe-dialog", "width=450,height=550");
};

const subscribeOnFeedly = () => {
  const feedlyUrl = `https://feedly.com/i/subscription/feed/${encodeURIComponent(url.value)}/rss.xml`;
  window.open(feedlyUrl, "feedly-subscribe-dialog", "width=550,height=420");
};

const pinOnPinterest = () => {
  const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url.value)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(description)}`;
  window.open(pinterestUrl, "pinterest-pin-dialog", "width=750,height=420");
};

const tweetOnTwitter = () => {
  const text = `${title.value} - ${url.value}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(tweetUrl, "twitter-tweet-dialog", "width=550,height=420");
};

const tweetOnTwitter2 = () => {
  const text = `${title.value} - ${url.value}`;
  const tweetUrl = `https://twitter.com/intent/share?url=${encodeURIComponent(url.value)}`;
  window.open(tweetUrl, "twitter-tweet-dialog", "width=550,height=420");
};

const tweetOnTwitterURL = () => {
  const text = `${title.value} - ${url.value}`;
  const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(text)}`;
  window.open(tweetUrl, "twitter-tweet-dialog", "width=550,height=420");
};

</script>