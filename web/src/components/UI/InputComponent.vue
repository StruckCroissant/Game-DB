<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";

interface Props {
  placeholder: string
}

const props = withDefaults(defineProps<Props>(),{
  placeholder: ''
});
const emit = defineEmits<{
  'input-changed': {value: any}
}>();

const value: Ref<string> = ref('');

watch(value, () => {
  emit('input-changed', {
    value: value.value
  });
});
</script>

<template>
  <div class="bubble-input">
    <input v-model="value" :placeholder="placeholder" v-bind="$attrs">
  </div>
</template>

<style scoped>

</style>