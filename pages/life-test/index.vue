<template>
  <section class="p-page_blog l-content_maxWidth-lg l-container">
    <section class="row l-page_content-row">
      <section class="col-md-9 col-12" fluid>
        <div v-if="authenticated" class="l-page_content">
          <ArticleListLanding :catSlug="catSlug" :apiURLBase="apiURLBase" :apiURL="apiURL"/>
        </div>
        <div v-else>
          <input type="password" v-model="password" placeholder="Enter password" @keyup.enter="authenticate">
        </div>
      </section>
      <Sidebar/>
    </section>
  </section>
</template>

<script setup>
useHead({
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ]
});

// Global setting
const config = useRuntimeConfig(); // API route
const catSlug = '/life/';
const topicID = '8';

// Get category name from URL path
const route = useRoute();
var pathSegments = route.path.split("/"); // Split the path using "/"
pathSegments = pathSegments.filter(function(segment) { // Filter out any empty segments
  return segment !== '';
});
var catName = pathSegments[pathSegments.length - 1]; // Get the last path

// API Content setting
const apiURLBase = ref(`${config.public.kurocoApiDomain}/rcms-api/1/content/list?topics_group_id=${topicID}`);
const apiURL = ref(apiURLBase.value);
const topics = ref('[]');

// Authentication
const password = ref('');
const correctPassword = 'mark'; // Change this to your actual password
const authenticated = ref(false);

const authenticate = () => {
  if (password.value === correctPassword) {
    authenticated.value = true;

     // Set localstorage/cookie
     localStorage.setItem("testpass", 'login');
  }
};


if (process.client) {
  const passwordLogin = localStorage.getItem("testpass");
  if (passwordLogin) {
    authenticated.value = true;
  };
};
</script>
