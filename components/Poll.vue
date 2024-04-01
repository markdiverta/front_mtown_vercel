<template>
    <section class="p-article_share l-content_padding -sm pb-5">
    <client-only>

      <h3 class="c-poll_heading">{{questionaire.subject}}</h3>

      <section class="c-poll pt-3" v-if="mode === 'result' || mode === 'submited' || mode === 'voted'">

        <div class="row c-poll_item align-items-center" v-for="item in questionaire">
          <template v-if="item.title">
            <div class="col-4 heading">
              {{item.title}}
              <!--{{item.vote}}-->
            </div>
            <div class="col c-poll_progress-wrap">
              <div class="row align-items-center">
                <div class="col"><div class="c-poll_progress" :style="{ width: `${item.percentage}%` }"></div></div>
                <div class="col-auto">{{item.percentage}}%</div>
              </div>
            </div>
          </template>
        </div>

        <div class="text-center pt-4">
          <button type="button" class="c-btn_main-dark c-btn submit-btn" @click="changeMode('vote')" :disabled='disabled'>あなたの意見を投票する</button>
        </div>

      </section>
      <section v-if="mode === 'vote'">

        <form @submit.prevent="submitVote" class="c-poll_form">
            <div class="c-poll_form-item" v-for="item in questionaire" :key="index">
                <label>
                    <input
                        type="radio"
                        :value="item.ext"
                        v-model="selectedOption"
                        name="question"
                        class="form-control"
                    >
                    {{ item.title }}
                </label>
            </div>

            <div class="text-center pt-4">
              <button type="submit" class="c-btn_main-dark c-btn submit-btn" :disabled='disabled'>
                  {{ isPollExpired ? '投票期限切れ' : 'あなたの意見を投票する' }}
              </button>
            </div>

        </form>
      
      </section>

      <section class="c-poll_msg text-center pt-2">
        <template v-if="mode === 'submited'">
          投票ありがとうございます。集計結果は24時間内に反映されます。
        </template>
        <template v-else-if="mode === 'expired'">
          この投票は期限切れです。
        </template>
        <template v-else-if="mode === 'voted'">
          投票済みです
        </template>
      </section>

    </client-only>
    </section> 
</template>

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
var voteID;

if (apiContent && apiContent.module_id) {
  try {
      const { data: content } = await useFetch(
          // `${config.public.kurocoApiDomain}/rcms-api/1/content/details/${apiContent.module_id}`,
          `https://dev-mtown.g.kuroco.app/rcms-api/1/content/details/${apiContent.module_id}`,
          {
              credentials: 'include',
          }
      );
      let contentDetails = content.value.details;
      let loop = [];
      let totalVote = 0;
      voteID = apiContent.module_id;

      //Check if poll date expired
      let currentDate = new Date();
      if (contentDetails.ext_1 && new Date(contentDetails.ext_1) < currentDate) {
        disabled.value = true;
        changeMode('expired');
      };

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
      votePercentage.value = totalVote > 0 ? 100/totalVote : 0;

      for (let item in loop) {
        let roundUp = Math.round;
        loop[item].percentage = roundUp(votePercentage.value*loop[item].vote);
      };
      loop.subject = contentDetails.subject;
      questionaire.value = loop;

  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
};

var selectedOption = null;
const submitVote = async () => {
    try {
      if (selectedOption) {
        const payload = { num: 1 };
        if (disabled.value == false) { //prevent user frontend modify disabled button for multiple resubmit
          const response = await $fetch(
              // `${config.public.kurocoApiDomain}/rcms-api/3/${selectedOption}/${apiContent.module_id}`,
              `https://dev-mtown.g.kuroco.app/rcms-api/3/${selectedOption}/${apiContent.module_id}`,
              {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(payload),
              }
          );
          if (response) {
            changeMode('submited');
            disabled.value = true;

            // Set localstorage/cookie
            localStorage.setItem("poll" + voteID, 'voted');
          }
        }
      }
    } catch (errors) {
      errors.value = errors?.data?.errors || [];
    }
};

const mode = ref('result');

const changeMode = (modeToChange) => {
    mode.value = modeToChange;
};
const status = (data) => {
  //If already voted
  mode.value = modeToChange;
};

if (process.client) {
  const voteHistory = localStorage.getItem("poll" + voteID);
  if (voteHistory && voteHistory == 'voted') {
    changeMode('voted');
    disabled.value = true;
  };
};
</script>