<template>
<section class="p-article l-content_maxWidth-lg l-container">

  <div v-if="newsTest.list.length > 0">
    <div v-for="newsTest in newsTest.list" :key="newsTest.topics_id">
        <NuxtLink :to="`/news/detail/${newsTest.topics_id}`">
          {{newsTest.subject}}
        </NuxtLink>
    </div>
  </div>

</section>
</template>

<script setup>
const { data: newsTest } = await useFetch(
  'https://mtown-vercel.g.kuroco.app/rcms-api/1/content/list?cnt=60',
  {
    credentials: 'include',
  }
);
</script>
