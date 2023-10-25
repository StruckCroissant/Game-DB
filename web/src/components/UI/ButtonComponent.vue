<script setup lang="ts">
import { ref, watch } from "vue";
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

const loadingFinished = ref<boolean>(false);
const clicking = ref<boolean>(false);

watch(
  () => props.loading,
  (newVal, oldVal) => {
    if (newVal != oldVal && newVal === false) return;

    loadingFinished.value = true;
    setTimeout(() => {
      loadingFinished.value = false;
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