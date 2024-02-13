import { singletonTimeoutFactory } from "@/utilities/common";
import { ref, toValue, computed, watch } from "vue";
import type { MaybeRefOrGetter } from "vue";

const setSingletonTimeout = singletonTimeoutFactory();

/**
 * Sets a result variable to true for a specified amount of time after loading finishes
 * @param loading Input loading state
 * @param delay Time to keep loadingFinished set to true
 */
export function useLoadingDelay(
  loading: MaybeRefOrGetter<boolean>,
  delay: number = 3000
) {
  const loadingTimeoutId = ref<NodeJS.Timeout | undefined>();
  const loadingFinished = computed(
    () => !!loadingTimeoutId.value && !toValue(loading)
  );

  watch(
    () => toValue(loading),
    (newVal, oldVal) => {
      if (newVal != oldVal && !newVal) return;

      loadingTimeoutId.value = setSingletonTimeout(() => {
        loadingTimeoutId.value = undefined;
      }, delay);
    }
  );

  return {
    loadingFinished,
  };
}
