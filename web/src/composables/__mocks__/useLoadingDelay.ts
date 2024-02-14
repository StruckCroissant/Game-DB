import { computed } from "vue";

export const useLoadingDelay = vi.fn(() => ({
  loadingFinished: computed(() => false),
}));
