<script setup>
  import { ref } from 'vue';

  const childComponentState = ref('false')

  const setModelValueTrue = () => {
    childComponentState.value = 'true'
  }
  </script>

  <template>
    <div>

      <button @click="setModelValueTrue" style="background:#ccc; border: 1px solid #000">Set model value true</button>
      <TestingChild v-model="childComponentState"/>
      
    </div>
  </template>