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

<script>
export default {
  name: 'SocialSharing',
  data() {
        return {
            title: '',
            url: '',
            description: '',
        }
  },
  mounted() {
        this.url = window.location.href;
        this.title = document.title;
  },
  methods: {
        shareOnFacebook() {
            const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`;
            window.open(url, "facebook-share-dialog", "width=626,height=436");
        },
        shareOnHatena() {
            const url = `https://b.hatena.ne.jp/add?mode=confirm&url=${encodeURIComponent(this.url)}&title=${encodeURIComponent(this.title)}`;
            window.open(url, "hatena-bookmark-dialog", "width=550,height=420");
        },
        saveToPocket() {
            const url = `https://getpocket.com/edit?url=${encodeURIComponent(this.url)}`;
            window.open(url, "pocket-bookmark-dialog", "width=350,height=550");
        },
        subscribeToRSS() {
            const url = "https://example.com/feed/";
            window.open(url, "rss-subscribe-dialog", "width=450,height=550");
        },
        subscribeOnFeedly() {
            const url = `https://feedly.com/i/subscription/feed/${encodeURIComponent(this.url)}/rss.xml`;
            window.open(url, "feedly-subscribe-dialog", "width=550,height=420");
        },
        pinOnPinterest() {
            const url = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(this.url)}&media=${encodeURIComponent(this.imageUrl)}&description=${encodeURIComponent(this.description)}`;
            window.open(url, "pinterest-pin-dialog", "width=750,height=420");
        },
        tweetOnTwitter() {
            const text = `${this.title} - ${this.url}`;
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
            window.open(url, "twitter-tweet-dialog", "width=550,height=420");
        },
        tweetOnTwitter2() {
            const text = `${this.title} - ${this.url}`;
            const url = `https://twitter.com/intent/share?url=${encodeURIComponent(this.url)}`; //old method
            window.open(url, "twitter-tweet-dialog", "width=550,height=420");
        },
        tweetOnTwitterURL() {
            const text = `${this.title} - ${this.url}`;
            const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(text)}`;
            window.open(url, "twitter-tweet-dialog", "width=550,height=420");
        },
  }
}
</script>