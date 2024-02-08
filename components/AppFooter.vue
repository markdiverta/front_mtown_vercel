<template>
  <footer class="l-footer">
    <a class="c-btn_bcktop" href="#" v-show="scrollPosition > 100" v-on:click.prevent="scrollToTop"><i aria-hidden="true" class="icon mdi mdi-chevron-up" style="color"></i></a>

    <section class="l-content_maxWidth-lg">
      <div class="l-footer_social">
        <div class="row">
          <div class="col-md-auto col-12">
            <img class="l-footer_logo" src="~/assets/images/logo-transparent.png" alt="MTown - マレーシアの週刊情報誌 Logo" width="186" height="56">
          </div>
          <div class="col l-footer_social-first">
            <a class="l-footer_link fb" href="https://www.facebook.com/weeklymtown/" target="_blank">Facebook</a>
          </div>
          <div class="col">
            <a class="l-footer_link insta" href="https://www.instagram.com/weeklymtown/" target="_blank">Instagram</a>
          </div>
          <div class="col">
            <a class="l-footer_link twitter" href="https://twitter.com/WeeklyMtown" target="_blank">X (旧Twitter)</a>
          </div>
          </div>
        </div>

        <div class="l-footer_menu">
          <ul id="menu-footer-menu" class="menu">
            <li><a href="/about-us/">会社情報</a></li>
            <li><a href="/media/">関連メディア</a></li>
            <li><a href="/inquiry/">お問い合わせ</a></li>
          </ul>
        </div>

        <p class="text-center">Copyright &copy; {{ currentYear }} mtown.my All right reserved.</p>
    </section>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentYear = ref(null);
const scrollPosition = ref("0");


const displayBackToTop = () => {
  scrollPosition.value = window.scrollY;
};

if (process.client) {
  window.addEventListener('scroll', displayBackToTop);
};

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

onMounted(() => {
  const year = new Date().getFullYear();
  currentYear.value = year;
});
</script>