import { MockedFunction } from "vitest";
import { computed } from "vue";
import { useLoadingDelay } from "../useLoadingDelay";

export function setUseLoadingDelayMock(loadingFinished: boolean = false) {
  (useLoadingDelay as MockedFunction<typeof useLoadingDelay>).mockReturnValue({
    loadingFinished: computed(() => loadingFinished),
  });
}
