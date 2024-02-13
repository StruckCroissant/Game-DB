import { computed } from "vue";
import { useLoadingDelay } from "../useLoadingDelay";

export const useLoadingDelay = vi.fn(() => ({
  loadingFinished: computed(() => false),
}));
