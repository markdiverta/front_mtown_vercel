<template>
    <section class="p-article_share l-content_padding -sm">

      <div v-for="item in questionaire">
        <template v-if="item.title">
          {{item.title}} = {{item.vote}}
        </template>
      </div>

    </section> 
</template>

<script setup>
//Global setting
const config = useRuntimeConfig(); //API route
import { useRouter } from 'vue-router';
const router = useRouter();
import { onMounted } from 'vue';

//Props
const props = defineProps(['pollContent']);
const apiContent = props.pollContent;
const questionaire = ref(''); 
if (apiContent.module_id) {
  try {
      const { data: content } = await useFetch(
          `https://dev-mtown.g.kuroco.app/rcms-api/1/content/details/${apiContent.module_id}`,
          {
              credentials: 'include',
          }
      );
      let contentDetails = content.value.details;
      let loop = [];
      console.log(contentDetails);
      // for (let item in contentDetails) {
      //   let question, vote;

      //   // if (item.includes('questionnaire_') && !item.includes('questionnaire_title_')) {
      //   //   vote = contentDetails[item];
      //   // };
      //   if (item.includes('questionnaire_title_')) {
      //     question = contentDetails[item];

      //     loop.push({
      //         title: question,
      //     });
      //   };
      // };
      // for (let item in contentDetails) {
      //   let vote;

      //   if (item.includes('questionnaire_') && !item.includes('questionnaire_title_')) {
      //     loop[i].vote = contentDetails[item];
      //   };
      // };
      for (let i = 1; i <= 10; i++) {
        const variableNameTitle = `questionnaire_title_${i}`;
        const variableNameVote = `questionnaire_${i}`;

        loop.push({
          title: contentDetails[variableNameTitle],
          vote: contentDetails[variableNameVote],
        });
      };
      questionaire.value = loop; 
      // console.log(questionnaire);

  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
}
</script>