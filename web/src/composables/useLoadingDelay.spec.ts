import { useLoadingDelay } from "@/composables/useLoadingDelay";
import { ref } from "vue";

describe("useLoadingDelay tests", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  it("should have loadingFinished as false when loading is true", () => {
    const loading = ref(true);
    const { loadingFinished } = useLoadingDelay(loading);

    expect(loadingFinished.value).toBe(false);
  });

  it("should update loadingFinished for specified duration after loading has finished", async () => {
    const loading = ref(false);
    const timeout = 1000;
    const { loadingFinished } = useLoadingDelay(loading, timeout);

    loading.value = true;
    await vi.advanceTimersByTimeAsync(100);
    loading.value = false;

    expect(loadingFinished.value).toBe(true);
  });
});
