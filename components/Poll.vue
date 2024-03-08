<template>
    <section class="p-article_share l-content_padding -sm">

      <div v-for="item in questionaire">
        <template v-if="item.title">
          {{item.title}} = {{item.vote}}
          <div class="progress" :style="{ width: `${item.percentage}%` }"></div>
        </template>
      </div>

    </section> 
</template>

<style scoped>
.progress {
  width: 100%;
  height: 15px;
  background-color: blue;
  /* background: linear-gradient(to right, #000 0%, #000 calc(attr(--percent) + 2px), #FFFFFF00 0%) no-repeat; */
}
</style>

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
const votePercentage = ref('');

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
      let totalVote = 0; 

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
        
        totalVote = totalVote + Number(contentDetails[variableNameVote]);
      };
      votePercentage.value = 100/totalVote; 

      for (let item in loop) {
        let roundUp = Math.round;
        loop[item].percentage = roundUp(votePercentage.value*loop[item].vote);
        console.log(loop[item]);
      };
      questionaire.value = loop;

  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
}
</script>