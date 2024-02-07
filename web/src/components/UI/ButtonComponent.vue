<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faCircleCheck);

interface Props {
  loading?: boolean;
  label?: string;
  error?: boolean;
  loadingSuccessText?: string;
  loadingSuccessIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  label: "button",
  error: false,
  loadingSuccessText: "Success",
  loadingSuccessIcon: "circle-check",
});

const loadingTimeoutId = ref<number | undefined>(undefined);
const clicking = ref(false);

const loadingFinished = computed(() => !!loadingTimeoutId.value);

watch(
  () => props.loading,
  (newVal, oldVal) => {
    if (newVal != oldVal && !newVal) return;

    clearTimeout(loadingTimeoutId.value);
    loadingTimeoutId.value = setTimeout(() => {
      loadingTimeoutId.value = undefined;
    }, 3000);
  }
);
</script>

<template>
  <button
    id="button"
    :aria-label="label"
    :class="['gradient-button', clicking ? 'gradient-button--clicked' : '']"
    @mousedown="clicking = true"
    @mouseup="clicking = false"
    @mouseleave="clicking = false"
  >
    <span v-if="loadingFinished && !loading && !error">
      {{ loadingSuccessText }}
      <FontAwesomeIcon :icon="loadingSuccessIcon" />
    </span>
    <slot v-else-if="!loading"></slot>
    <span v-else class="loader loader--small" data-testid="spinner"></span>
  </button>
</template>

<style scoped>
#button {
  font-weight: bold;
}
</style>
