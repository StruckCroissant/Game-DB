<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";
import _ from "lodash";

interface Props {
  invalid? : boolean,
  label?: string,
  invalidMessage?: string
}

const props = withDefaults(defineProps<Props>(),{
  invalid: false,
  label: ''
});
const emit = defineEmits<{
  'input-changed': {value: any}
}>();

const value: Ref<string> = ref('');
const clicking: Ref<boolean> = ref(false);
const name: string = _.uniqueId('input-');

watch(value, () => {
  emit('input-changed', {
    value: value.value
  });
});
</script>

<template>
  <div
    :class="[
      'rounded-input',
      invalidMessage ? 'rounded-input--error' : ''
    ]"
  >
    <div class="rounded-input__input">
      <input
        v-model="value"
        v-bind="$attrs"
        :name="name"
      >
    </div>
    <div v-if="invalidMessage" class="rounded-input__invalid-message">{{ invalidMessage }}</div>
  </div>
</template>

<style scoped>
</style>