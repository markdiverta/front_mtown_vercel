<template>
    <div>
      <section class="l-content_maxWidth-md l-content_padding -xs l-container">
        <div class="l-breadcum">
          <a href="/" class="item">ホーム</a>
          <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
          <span class="item">マレーシアでの広告掲載や資料請求、その他お問い合わせはこちら | MTown(エムタウン)</span>
      </div>

      <h1 class="p-heading mb-2">マレーシアでの広告掲載や資料請求、その他お問い合わせはこちら | MTown(エムタウン)</h1>
        <!-- <UiPageHeader subject="お問い合わせ" subheading="Inquiry" /> -->
      </section>

      <section class="l-content_maxWidth-xs">
          <template v-if="submitted">
              <div class="text-center mt-10">
                <h2>メッセージは送信されました。ありがとうございました。</h2>
                <NuxtLink to="/" class="c-button">トップページ</NuxtLink>
              </div>
          </template>
          <template v-else>

            <UiAlertError
                ref="errorRef"
                v-show="errors.length > 0"
                :error="errors"
                class="c-form_error"
            />

            <div class="c-form_border mt-4">
              <!-- <div class="c-form-group">
                <p
                  class="c-text c-text--pre"
                  v-html="response.details.inquiry_info"
                />
                <p class="c-text--small">
                  <span class="c-form-label__required">*</span>は必須項目です。
                </p>
              </div> -->

              <form class="c-form">
                <div
                  v-for="n in response.details.cols"
                  :key="n.key"
                  class="c-form-group"
                >
                  <div class="c-form-wrapper">
                    <label :for="n.key" class="c-form-label">{{ n.title }}</label>
                    <span v-if="n.required === 2" class="c-form-label__required"
                    >*</span
                    >
                  </div>
                  <!-- テキスト -->
                  <template v-if="n.type === 1">
                    <!-- <input
                      v-model="submitData[n.key]"
                      :name="n.key"
                      :id="n.key"
                      type="text"
                    /> -->
                    <UInput 
                      color="gray"
                      variant="outline"
                      size="md"
                      v-model="submitData[n.key]"
                    />
                  </template>
                  <!--テキストエリア-->
                  <template v-if="n.type === 2">
                    <UTextarea
                      resize
                      color="gray"
                      variant="outline"
                      size="md"
                      v-model="submitData[n.key]"
                    />
                  </template>
                  <!--ラジオボタン-->
                  <template v-if="n.type === 3">
                    <ul>
                      <li v-for="option in n.options" :key="option.key">
                        <input
                          v-model="submitData[n.key]"
                          type="radio"
                          :name="n.key"
                          :value="option.key"
                          :id="n.key + '-' + option.key"
                          class="c-form-toggle__radio"
                        />
                        <label :for="n.key + '-' + option.key">
                          {{ option.value }}
                        </label>
                      </li>
                    </ul>
                  </template>
                  <!--セレクトボックス-->
                  <template v-if="n.type === 4">
                    <select v-model="submitData[n.key]" :name="n.key" :id="n.key">
                      <option label="選択なし" value="">選択なし</option>
                      <option
                        v-for="option in n.options"
                        :key="option.key"
                        :id="n.key + '-' + option.key"
                        :label="option.value"
                        :value="option.key"
                      >
                        {{ option.value }}
                      </option>
                    </select>
                  </template>
                  <!--チェックボックス-->
                  <template v-if="n.type === 5">
                    <div class="c-form-checkbox">
                      <UCheckbox
                        v-for="option in n.options"
                        type="checkbox"
                        :key="option.key"
                        :name="n.key + '[]'"
                        :value="option.key"
                        v-model="submitData[n.key]"
                        :label="option.value"
                        class="c-form-checkbox-item my-1"
                      >
                      </UCheckbox>
                    </div>
                  </template>
                  <!--日付-->
                  <template v-if="n.type === 6">
                    <div class="u-display-flex u-display-flex-align-items-center">
                      <select
                        v-model="y"
                        @change="setYMD(n.key)"
                        :name="n.key + '_y'"
                        :id="n.key + '_y'"
                      >
                        <option label="選択なし" value="">選択なし</option>
                        <option
                          v-for="option in n.attribute.arrYear"
                          :key="option.key"
                          :label="option"
                          :value="option"
                        >
                          {{ option }}
                        </option></select
                      ><label :for="n.key + '_y'" class="u-pa-10">年</label>
    
                      <select
                        v-model="m"
                        @change="setYMD(n.key)"
                        :name="n.key + '_m'"
                      >
                        <option label="選択なし" value="">選択なし</option>
                        <option label="01" value="01">01</option>
                        <option label="02" value="02">02</option>
                        <option label="03" value="03">03</option>
                        <option label="04" value="04">04</option>
                        <option label="05" value="05">05</option>
                        <option label="06" value="06">06</option>
                        <option label="07" value="07">07</option>
                        <option label="08" value="08">08</option>
                        <option label="09" value="09">09</option>
                        <option label="10" value="10">10</option>
                        <option label="11" value="11">11</option>
                        <option label="12" value="12">12</option></select
                      ><label :for="n.key + '_m'" class="u-pa-10">月</label>
                      <select
                        v-model="d"
                        @change="setYMD(n.key)"
                        :name="n.key + '_d'"
                      >
                        <option label="選択なし" value="">選択なし</option>
                        <option label="01" value="01">01</option>
                        <option label="02" value="02">02</option>
                        <option label="03" value="03">03</option>
                        <option label="04" value="04">04</option>
                        <option label="05" value="05">05</option>
                        <option label="06" value="06">06</option>
                        <option label="07" value="07">07</option>
                        <option label="08" value="08">08</option>
                        <option label="09" value="09">09</option>
                        <option label="10" value="10">10</option>
                        <option label="11" value="11">11</option>
                        <option label="12" value="12">12</option>
                        <option label="13" value="13">13</option>
                        <option label="14" value="14">14</option>
                        <option label="15" value="15">15</option>
                        <option label="16" value="16">16</option>
                        <option label="17" value="17">17</option>
                        <option label="18" value="18">18</option>
                        <option label="19" value="19">19</option>
                        <option label="20" value="20">20</option>
                        <option label="21" value="21">21</option>
                        <option label="22" value="22">22</option>
                        <option label="23" value="23">23</option>
                        <option label="24" value="24">24</option>
                        <option label="25" value="25">25</option>
                        <option label="26" value="26">26</option>
                        <option label="27" value="27">27</option>
                        <option label="28" value="28">28</option>
                        <option label="29" value="29">29</option>
                        <option label="30" value="30">30</option>
                        <option label="31" value="31">31</option></select
                      ><label :for="n.key + '_d'" class="u-pa-10">日</label>
                    </div>
                  </template>
                  <!-- ファイル -->
                  <template v-if="n.type === 7">
                    <ul>
                      <li>
                        <input
                          type="file"
                          @change="handleFileChange"
                          :accept="
                            n.options.map(({ value }) => `.${value}`).join(',') ||
                            '*'
                          "
                          :name="n.key"
                          :id="n.key"
                        />
                        <p class="text-xs mt-2">※写真ファイルは0-1,500Kb (1.5Mb)までとしてください。</p>
                      </li>
                    </ul>
                  </template>
                  <!--マトリックス(単一選択)-->
                  <template
                    v-if="n.type === 10 && n.attribute.selection_type === 'single'"
                  >
                    <table class="u-width-100">
                      <thead>
                        <tr>
                          <th></th>
                          <th
                            v-for="(options_col, i_col) in n.options[0].value"
                            :key="i_col"
                            scope="col"
                          >
                            {{ options_col }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(options_row, i_row) in n.options[1].value"
                          :key="i_row"
                        >
                          <th scope="row">{{ options_row }}</th>
                          <td
                            v-for="(options_col, i_col) in n.options[0].value"
                            :key="i_col"
                            class="u-text-align-center"
                          >
                            <input
                              v-model="submitData[n.key][i_row - 1]"
                              type="radio"
                              :name="n.key + '[' + i_row + ']'"
                              :value="{
                                ROW: {
                                  key: i_row,
                                },
                                COL: {
                                  key: i_col,
                                },
                              }"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                  <!--マトリックス(複数選択)-->
                  <template
                    v-if="
                      n.type === 10 && n.attribute.selection_type === 'multiple'
                    "
                  >
                    <table class="u-width-100">
                      <thead>
                        <tr>
                          <th></th>
                          <th
                            v-for="(options_col, i_col) in n.options[0].value"
                            :key="i_col"
                          >
                            {{ options_col }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(options_row, i_row) in n.options[1].value"
                          :key="i_row"
                        >
                          <th>{{ options_row }}</th>
                          <td
                            v-for="(options_col, i_col) in n.options[0].value"
                            :key="i_col"
                            class="u-text-align-center"
                          >
                            <input
                              type="checkbox"
                              :id="i_col"
                              v-model="submitData[n.key][i_row - 1].COL"
                              :value="{
                                key: i_col,
                              }"
                              class="c-form-toggle__checkbox"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                </div>
                <div class="text-center">
                  <button 
                      type="submit"
                      id="inquiry_item_button_confirm"
                      :loading="loading"
                      @click.prevent="handleOnSubmit"
                      size="xl"
                      class="c-btn c-btn_main c-btn_lg"
                  >
                    送信
                  </button>
                </div>
              </form>
            </div>
          </template>
        </section>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const config = useRuntimeConfig();
  
  const submitted = ref(false);
  const errors = ref([]);
  const errorRef = ref(null);
  const disabled = ref(true);
  const submitData = reactive({});
  const thanksText = ref(null);
  const y = ref('');
  const m = ref('');
  const d = ref('');
  const loading = ref(false);

  const props = defineProps ({
    color: {
      type: String 
    }
  })
  const primaryColor = ref('#2FB5CE');
  const updatePrimaryColor = (newColor) => {
  primaryColor.value = newColor;
  };
  // export { primaryColor, updatePrimaryColor };
  
  const { data: response } = await useFetch(
    `${config.public.kurocoApiDomain}/rcms-api/1/inquiry/1`,
    {
      credentials: 'include',
    }
  );
  
  Object.keys(response.value.details.cols).forEach((key) => {
    const object = response.value.details.cols[key];
  
    if (object.type === 5 || object.type === 10) {
      submitData[object.key] = ref([]);
    }
  
    if (object.type === 10 && object.attribute.selection_type === 'multiple') {
      Object.keys(object.options[1].value).forEach((key) => {
        if (!submitData[object.key]) {
          submitData[object.key] = [];
        }
  
        submitData[object.key].push({
          ROW: {
            key: key,
          },
          COL: [],
        });
      });
    }
  });
  
  const setYMD = (key) => {
    submitData[key] = `${y.value}-${m.value}-${d.value}`;
  };
  
  const handleFileChange = async (e) => {
    const fm = new FormData();
    fm.append('file', e.target.files[0]);
  
    try {
      const response = await $fetch(
        `${config.public.kurocoApiDomain}/rcms-api/1/upload`,
        {
          credentials: 'include',
          method: 'POST',
          body: fm,
        }
      );
      error.value = [];
      const file_id = response.data.file_id;
      submitData[e.target.id] = { file_id };
    } catch (e) {
      errors.value = e?.data?.errors || [];
      nextTick(() => {
        errorRef.value.errorWrapperRef.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      });
    }
  };
  
  const handleOnSubmit = async () => {
    submitData.id = 1;
    try {
      loading.value = true;
      const response = await $fetch(
        `${config.public.kurocoApiDomain}/rcms-api/1/inquiry/submit`,
        {
          credentials: 'include',
          method: 'POST',
          body: submitData,
        }
      );
      submitted.value = true;
      thanksText.value = response.messages[0];
    } catch (e) {
      errors.value = e?.data?.errors || [];
      nextTick(() => {
        errorRef.value.errorWrapperRef.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      });
    }
    loading.value = false;
  };


  useHead({
      title: 'お問い合わせ',
      meta: [
          {
              hid: 'og:title',
              property: 'og:title',
              content: 'お問い合わせ'
          },
          {
              hid: 'og:description',
              property: 'og:description',
              content: '広告掲載や資料請求、その他ご意見・ご感想等、下記のお問い合わせフォームにご記入の上ご送信ください。いつもMTown(エムタウン)をご覧いただきありがとうございます。'
          },
          {
              hid: 'description',
              name: 'description',
              content: '広告掲載や資料請求、その他ご意見・ご感想等、下記のお問い合わせフォームにご記入の上ご送信ください。いつもMTown(エムタウン)をご覧いただきありがとうございます。'
          }
      ]
  });
  </script>

<style scoped>
  .c-form label {
      padding-bottom: 6px;
      display: inline-block;
  }
  .c-form-group {
    margin-bottom: 25px;
  }
  .c-form-checkbox {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .c-form-checkbox-item {
    display: flex;
    width: 44%;
  }
  .primaryBtn {
    text-decoration: none;
    background-color: #2FB5CE;
  }
  .primaryBtn:hover {
    opacity: .8;
    transition: all .3s;
  }
</style>
  