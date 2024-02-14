import ToastComponent from "@/components/UI/ToastComponent.vue";
import { render, waitFor } from "@testing-library/vue";
import { userEvent } from "@testing-library/user-event";
import {
  getByText as glGetByText,
  getByTestId as glGetByTestId,
} from "@testing-library/vue";
import "@testing-library/jest-dom";
import { Toast, useToast } from "@/stores/toastStore";

vi.mock("@/stores/toastStore");
vi.mock("pinia", async () => {
  return {
    storeToRefs: vi.fn(() => ({ toasts })),
  };
});
const { toasts } = await vi.hoisted(async () => {
  const { ref } = await import("vue");
  return {
    toasts: ref<Array<Toast>>([]),
  };
});

describe("ToastComponent tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });
  afterEach(() => {
    toasts.value = [];
  });

  it("Should display new messages", async () => {
    const { getByTestId } = render(ToastComponent);
    toasts.value.push({ id: 1, status: "warning", text: "test" });

    expect(useToast).toBeCalled();
    await waitFor(() => {
      expect(getByTestId("toast-list")).toBeInTheDocument();
    });
    const list = getByTestId("toast-list");
    glGetByText(list, "test");
    glGetByTestId(list, "toast-close");
  });

  it("Clicking remove on the toast item removes the item", async () => {
    const { getByTestId } = render(ToastComponent);
    toasts.value.push({ id: 1, status: "warning", text: "test" });

    await waitFor(() => {
      expect(getByTestId("toast-close")).toBeInTheDocument();
    });
    await userEvent.click(getByTestId("toast-close"));
    expect(useToast().remove).toBeCalled();
  });

  it("Should time out old messages after a set period", () => {
    throw new Error("need to finish");
  });
});
