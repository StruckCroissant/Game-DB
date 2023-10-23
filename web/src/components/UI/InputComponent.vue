<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";
import _ from "lodash";

interface Props {
  placeholder: string,
  invalid: boolean,
  label: string
}

const props = withDefaults(defineProps<Props>(),{
  placeholder: '',
  invalid: false,
});
const emit = defineEmits<{
  'input-changed': {value: any}
}>();

const value: Ref<string> = ref('');
const name: string = _.uniqueId('input-');

watch(value, () => {
  emit('input-changed', {
    value: value.value
  });
});
</script>

<template>
  <div id="wrapper">
    <label :for="name">{{ label }}</label>
    <div :class="['bubble-input', invalid ? 'bubble-input--error' : '']">
      <input
        v-model="value"
        v-bind="$attrs"
        :placeholder="placeholder"
        :name="name"
      >
    </div>
  </div>
</template>

<style scoped>
label {
  font-size: 18px;
  padding-bottom: 0.2rem;
}

#wrapper {
  display: flex;
  flex-direction: column;
}
</style>