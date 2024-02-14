import ToastComponent from "@/components/UI/ToastComponent.vue";
import { render, waitFor } from "@testing-library/vue";
import { userEvent } from "@testing-library/user-event";
import {
  getByText as glGetByText,
  getByTestId as glGetByTestId,
} from "@testing-library/vue";
import "@testing-library/jest-dom";
import { toasts, useToast, addToast } from "@/stores/__mocks__/toastStore";

vi.mock("@/stores/toastStore");
vi.mock("pinia", async () => {
  return {
    storeToRefs: vi.fn(() => ({ toasts })),
  };
});

describe("ToastComponent tests", () => {
  afterEach(() => {
    toasts.value = [];
  });

  it("Should display new messages", async () => {
    const { getByTestId } = render(ToastComponent);
    addToast("warning", "test");

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
    addToast("warning", "test");

    await waitFor(() => {
      expect(getByTestId("toast-close")).toBeInTheDocument();
    });
    await userEvent.click(getByTestId("toast-close"));
    expect(useToast().remove).toBeCalled();
  });

  it("Should remove old toasts", async () => {
    const { getByTestId, queryByTestId } = render(ToastComponent);
    addToast("warning", "test");

    await waitFor(() => {
      expect(getByTestId("toast-list")).toBeInTheDocument();
    });
    toasts.value = [];
    await waitFor(() => {
      expect(queryByTestId("toast-list")).not.toBeInTheDocument();
    });
  });
});
