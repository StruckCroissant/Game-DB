import { createPinia, setActivePinia } from "pinia";
import { useToast } from "./toastStore";
import type { ToastStatus } from "./toastStore";

describe("toastStore tests", () => {
  let toastStore: ReturnType<typeof useToast>;

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
    toastStore = useToast();
  });

  it("updateState should add new toasts", () => {
    const expectedText = "test";
    const expectedStatus = "success";

    toastStore.updateState({ text: expectedText }, expectedStatus);
    const newToast = toastStore.toasts.at(-1);

    expect(newToast).toBeDefined();
    expect(newToast?.status).toBe(expectedStatus);
    expect(newToast?.text).toBe(expectedText);
  });

  it("updateState should remove old toasts after a default period", () => {
    toastStore.updateState({ text: "test" }, "success");

    expect(toastStore.toasts.length).toBeGreaterThan(0);
    vi.advanceTimersByTime(11000);
    expect(toastStore.toasts.length).toBe(0);
  });

  it("updateState should remove old toasts after a specified period", () => {
    toastStore.updateState({ text: "test", timeout: 5 }, "success");

    expect(toastStore.toasts.length).toBeGreaterThan(0);
    vi.advanceTimersByTime(5);
    expect(toastStore.toasts.length).toBe(0);
  });

  it("simple state actions should create a new associated status toast", () => {
    const expectedToastStatuses: ToastStatus[] = [
      "success",
      "warning",
      "error",
    ];

    expectedToastStatuses.forEach((status) => {
      const expectedText = status + " message";

      toastStore[status]({ text: expectedText });

      toastStore.toasts.forEach((toast) => {
        expect(toast.status).toBe(status);
        expect(toast.text).toBe(expectedText);
        vi.advanceTimersByTime(10000);
      });
    });
  });

  it("remove should remove an existing toast", () => {
    toastStore.success({ text: "test" });
    const newToast = toastStore.toasts.at(-1);

    expect(toastStore.toasts.length).toBe(1);

    toastStore.remove(newToast?.id as number);

    expect(toastStore.toasts.length).toBe(0);
  });
});
