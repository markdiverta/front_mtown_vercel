<script setup>
  import { ref } from 'vue';

  const childComponentState = ref(false)

  const setModelValueTrue = () => {
    childComponentState.value = true
  }
  </script>

  <template>
    <div>
      <h2>Parent component</h2>
      <button @click="setModelValueTrue">Set model value true</button>

      <TestingChild v-model="childComponentState"/>
    </div>
  </template>