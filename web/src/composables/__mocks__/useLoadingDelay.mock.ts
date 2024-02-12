import { MockedFunction } from "vitest";
import { computed } from "vue";
import { useLoadingDelay } from "../useLoadingDelay";

type UseLoadingDelayMock = MockedFunction<typeof useLoadingDelay>;

export function getUseLoadingDelayMock(
  loadingFinished: boolean = false
): UseLoadingDelayMock {
  (useLoadingDelay as UseLoadingDelayMock).mockReturnValue({
    loadingFinished: computed(() => loadingFinished),
  });

  return useLoadingDelay as UseLoadingDelayMock;
}
