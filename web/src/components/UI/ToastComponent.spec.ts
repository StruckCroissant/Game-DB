import ToastComponent from "@/components/UI/ToastComponent.vue";
import { waitFor } from "@testing-library/vue";
import type { Ref } from "vue";
import { render } from "@testing-library/vue";
import {
  getByText as glGetByText,
  getByTestId as glGetByTestId,
} from "@testing-library/vue";
import "@testing-library/jest-dom";

vi.mock("@/stores/toastStore");
vi.mock("pinia", async () => {
  const { toasts } = await mocks;
  return {
    storeToRefs: vi.fn(() => ({ toasts })),
  };
});
const mocks = vi.hoisted(async () => {
  const { ref } = await import("vue");
  return {
    toasts: ref<Array<any>>([]),
  };
});

describe("ToastComponent tests", () => {
  let toasts: Ref | null = null;
  beforeEach(async () => {
    toasts = (await mocks).toasts;
  });

  it("Should display new messages", async () => {
    const { getByTestId } = render(ToastComponent);
    (toasts as Ref).value.push({ id: 1, status: "warning", text: "test" });

    await waitFor(() => {
      expect(getByTestId("toast-list")).toBeInTheDocument();
    });
    const list = getByTestId("toast-list");
    glGetByText(list, "test");
    glGetByTestId(list, "toast-close");
  });

  it("Clicking remove on the toast item removes the item", () => {
    throw new Error("need to finish");
  });

  it("Should time out old messages after a set period", () => {
    throw new Error("need to finish");
  });
});
