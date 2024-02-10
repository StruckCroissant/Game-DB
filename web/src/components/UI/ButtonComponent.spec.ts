import { render, waitFor } from "@testing-library/vue";
import ButtonComponent from "./ButtonComponent.vue";
import { useLoadingDelay } from "@/composables/network/useLoadingDelay";
import "@testing-library/jest-dom";
import { MockedFunction } from "vitest";
import { computed } from "vue";

vi.mock("@/composables/network/useLoadingDelay");

function setMock(loadingFinished: boolean = false) {
  (useLoadingDelay as MockedFunction<typeof useLoadingDelay>).mockReturnValue({
    loadingFinished: computed(() => loadingFinished),
  });
}

describe("ButtonComponent tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("Should not show success message on error", async () => {
    setMock(true);
    const { getByTestId } = render(ButtonComponent, {
      props: { label: "button", loading: false },
    });

    expect(getByTestId("success")).toBeInTheDocument();
  });

  it("Should show loading icon while loading", () => {
    setMock(false);

    const { getByRole, getByTestId } = render(ButtonComponent, {
      props: { label: "button", loading: true },
    });

    getByRole("button", { name: "button" });
    getByTestId("spinner");
  });

  it("Should show slot contents", () => {
    const buttonName = "Success button";
    const slotContent = `<div></div>`;
    setMock(false);

    const { getByRole } = render(ButtonComponent, {
      props: { label: buttonName },
      slots: { default: slotContent },
    });

    const button = getByRole("button", { name: buttonName });
    expect(button.innerHTML).toEqual(slotContent);
  });
});
