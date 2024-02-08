<script setup>
const props = defineProps({
  modelValue: {
    default: "false"
  }
})

props.modelValue = '123123';

// const emit = defineEmits(['update:modelValue'])
const setModelValueTrue = () => {
  modelValue.value = 'false'
}
</script>

<template>
  <div>

      <button @click="setModelValueFalse">
        Set model value false
      </button>

      <h1>{{modelValue}}</h1>
      
  </div>
</template>