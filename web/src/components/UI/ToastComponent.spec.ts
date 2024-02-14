import ToastComponent from "@/components/UI/ToastComponent.vue";
import { render, waitFor } from "@testing-library/vue";
import { userEvent } from "@testing-library/user-event";
import {
  getByText as glGetByText,
  getByTestId as glGetByTestId,
} from "@testing-library/vue";
import "@testing-library/jest-dom";
const toastStore: any = await import("@/stores/toastStore");

vi.mock("@/stores/toastStore");
vi.mock("pinia", async () => {
  return {
    storeToRefs: vi.fn(() => ({ toasts: toastStore.toasts })),
  };
});

describe("ToastComponent tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });
  afterEach(() => {
    toastStore.toasts.value = [];
  });

  it("Should display new messages", async () => {
    const { getByTestId } = render(ToastComponent);
    toastStore.toasts.value.push({ id: 1, status: "warning", text: "test" });

    expect(toastStore.useToast).toBeCalled();
    await waitFor(() => {
      expect(getByTestId("toast-list")).toBeInTheDocument();
    });
    const list = getByTestId("toast-list");
    glGetByText(list, "test");
    glGetByTestId(list, "toast-close");
  });

  it("Clicking remove on the toast item removes the item", async () => {
    const { getByTestId } = render(ToastComponent);
    toastStore.toasts.value.push({ id: 1, status: "warning", text: "test" });

    await waitFor(() => {
      expect(getByTestId("toast-close")).toBeInTheDocument();
    });
    await userEvent.click(getByTestId("toast-close"));
    expect(toastStore.useToast().remove).toBeCalled();
  });

  it("Should remove old toasts", async () => {
    const { getByTestId, queryByTestId } = render(ToastComponent);
    toastStore.toasts.value.push({ id: 1, status: "warning", text: "test" });

    await waitFor(() => {
      expect(getByTestId("toast-list")).toBeInTheDocument();
    });
    toastStore.toasts.value = [];
    await waitFor(() => {
      expect(queryByTestId("toast-list")).not.toBeInTheDocument();
    });
  });
});
