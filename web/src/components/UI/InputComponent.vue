<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";

interface Props {
  defaultPlaceholder: String
}

const props = withDefaults(defineProps<Props>(),{
  defaultPlaceholder: ''
});
// const props = defineProps<{
//   defaultPlaceholder: {
//     type: String,
//     required: false,
//     default: ''
//   }
// }>();
const emit = defineEmits<{
  inputChanged: {value: any}
}>();

const value: Ref<String> = ref('');

watch(value, () => {
  emit('input-changed', {
    value: value.value
  });
});
</script>

<template>
  <div class="input--bubble">
    <input v-model="value" :placeholder="defaultPlaceholder">
  </div>
</template>

<style scoped>

</style>