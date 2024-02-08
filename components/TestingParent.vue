<script setup>
  import { ref } from 'vue';

  const childComponentState = ref('false')

  const setModelValueTrue = () => {
    childComponentState.value = 'true'
  }
  </script>

  <template>
    <div>

      <button @click="setModelValueTrue">Set model value true</button>
      <TestingChild v-model="childComponentState"/>

      {{childComponentState}}
      
    </div>
  </template>