<script setup lang="ts">
import { ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faCircleCheck);

interface Props {
  loading: boolean,
  error: boolean,
  loadingSuccessText?: string,
  loadingSuccessIcon?: string,
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: false,
  loadingSuccessText: 'Success',
  loadingSuccessIcon: 'circle-check',
});
const emit = defineEmits<{
  'conclusion-start': void,
  'conclusion-end': void,
}>();

const loadingFinished = ref<boolean>(false);
const clicking = ref<boolean>(false);

watch(
  () => props.loading,
  (newVal, oldVal) => {
    if (newVal != oldVal && !newVal) return;

    loadingFinished.value = true;
    emit('conclusion-start');
    setTimeout(() => {
      loadingFinished.value = false;
      emit('conclusion-end');
    }, 3000);
  }
);
</script>

<template>
  <button
    id="button"
    :class="[
      'gradient-button',
      clicking ? 'gradient-button--clicked' : ''
    ]"
    @mousedown="clicking = true"
    @mouseup="clicking = false"
    @mouseleave="clicking = false"
  >
    <span v-if="loadingFinished && !loading && !error">
      {{ loadingSuccessText }}
      <FontAwesomeIcon :icon="loadingSuccessIcon"/>
    </span>
    <slot v-else-if="!loading"></slot>
    <span v-else class="loader loader--small"></span>
  </button>
</template>

<style scoped>
#button {
  font-weight: bold;
}
</style>