<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <div  class="child">
      <h3>
        Child component
      </h3>
      <div v-if="modelValue">
        <strong>
          Model value is true! ✅
        </strong>
      </div>
      <div v-else>
        <strong>
          Model value is false! ❌
        </strong>
      </div>
      <button @click="$emit('update:modelValue', false)">
        Set model value false
      </button>
    </div>
  </div>
</template>

<style scoped>
.child {
  border: 1px solid #00bd7e;
  margin: 10px 0;
  padding: 24px;
}
</style>