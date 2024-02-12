import { getUseLoadingDelayMock } from "@/composables/__mocks__/useLoadingDelay.mock";
import { render } from "@testing-library/vue";
import ButtonComponent from "./ButtonComponent.vue";
import "@testing-library/jest-dom";
vi.mock("@/composables/useLoadingDelay");

describe("ButtonComponent tests", () => {
  beforeEach(() => getUseLoadingDelayMock());

  it("Should not show success message on error", async () => {
    getUseLoadingDelayMock(true);
    const { queryByTestId } = render(ButtonComponent, {
      props: { label: "button", loading: false, error: true },
    });

    expect(queryByTestId("success")).toBeNull();
  });

  it("Should show success message on error", async () => {
    getUseLoadingDelayMock(true);
    const { getByTestId } = render(ButtonComponent, {
      props: { label: "button", loading: false },
    });

    expect(getByTestId("success")).toBeInTheDocument();
  });

  it("Should show loading icon while loading", () => {
    const { getByRole, getByTestId } = render(ButtonComponent, {
      props: { label: "button", loading: true },
    });

    getByRole("button", { name: "button" });
    getByTestId("spinner");
  });

  it("Should show slot contents", () => {
    const buttonName = "Success button";
    const slotContent = `<div></div>`;

    const { getByRole } = render(ButtonComponent, {
      props: { label: buttonName },
      slots: { default: slotContent },
    });

    const button = getByRole("button", { name: buttonName });
    expect(button.innerHTML).toEqual(slotContent);
  });
});
