<template>
    <section class="p-article_share l-content_padding -sm">

      {{questionaire.subject}}

      <section v-if="mode === 'result'">

        <div v-for="item in questionaire">
          <template v-if="item.title">
            {{item.title}} = {{item.vote}}
            <div class="progress" :style="{ width: `${item.percentage}%` }"></div>
            {{item.percentage}}%
          </template>
        </div>
        <button type="button" class="c-btn_main-dark c-btn submit-btn" @click="changeMode('vote')" :disabled='disabled'>あなたの意見を投票する</button>

      </section>
      <section v-if="mode === 'vote'">

        <form @submit.prevent="submitVote">
            <div v-for="item in questionaire" :key="index">
                <label>
                    <input
                        type="radio"
                        :value="item.ext"
                        v-model="selectedOption"
                        name="question"
                    >
                    {{ item.title }}
                </label>
            </div>

            <div v-if="!hasVoted">
                <div class="pollBtn">
                    <button type="submit" class="c-btn_main-dark c-btn submit-btn" @click="preventMultipleClicks" :disabled='disabled'>
                        {{ isPollExpired ? '投票期限切れ' : 'あなたの意見を投票する' }}
                    </button>
                </div>
                <p v-if="isPollExpired" class="expired-text">この投票は期限切れです。</p>
                <div v-if="voteSubmitted">
                    <p class="thank-you-message">投票ありがとうございます。集計結果は24時間内に反映されます。</p>
                </div>
            </div>
            <div v-else>
                <div class="pollBtn">
                    <button type="submit" class="c-btn_main-dark c-btn submit-btn" :disabled='disabled'>
                        {{ isPollExpired ? '投票期限切れ' : 'あなたの意見を投票する' }}
                    </button>
                </div>
                <p v-if="isPollExpired" class="expired-text">この投票は期限切れです。</p>
                <p v-if="hasVoted" class="voted-text">投票済みです</p>
            </div>
        </form>
      
      </section>

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
const disabled = ref(false);

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

      //Check if poll date expired
      let currentDate = new Date();
      disabled.value = contentDetails.ext_1 ? new Date(contentDetails.ext_1) < currentDate : false;

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

        if (contentDetails[variableNameTitle]) {

          loop.push({
            title: contentDetails[variableNameTitle],
            vote: contentDetails[variableNameVote],
            ext: variableNameVote
          });
          totalVote = totalVote + Number(contentDetails[variableNameVote]);

        };
      };
      votePercentage.value = 100/totalVote; 

      for (let item in loop) {
        let roundUp = Math.round;
        loop[item].percentage = roundUp(votePercentage.value*loop[item].vote);
      };
      loop.subject = contentDetails.subject;
      questionaire.value = loop;
      console.log(loop);

  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
};

var selectedOption = null;
const submitVote = async () => {
  console.log(selectedOption);
    try {
      if (selectedOption) {
        console.log('submitting');
        const payload = { num: 1 };
        const response = await $fetch(
            // `${config.public.kurocoApiDomain}/rcms-api/1/inquiry/submit`,
            `https://dev-mtown.g.kuroco.app/rcms-api/3/${selectedOption}/${apiContent.module_id}`,
            {
              credentials: 'include',
              method: 'POST',
              body: JSON.stringify(payload),
            }
        );
        changeMode('result');
        disabled.value = true;

        console.log('submited');
      }
    } catch (e) {
      errors.value = e?.data?.errors || [];
    }
};

const mode = ref('result');

const changeMode = (modeToChange) => {
    mode.value = modeToChange;
};
const status = (data) => {
  //If poll date is expired
  console.log();

  //If already voted
  mode.value = modeToChange;
};
</script>