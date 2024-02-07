import { ref } from "vue";
import { render, waitFor } from "@testing-library/vue";
import ButtonComponent from "./ButtonComponent.vue";

describe("ButtonComponent tests", () => {
  it("Should show success message", () => {
    console.error("Need to finish test");
  });

  it("Should not show success message on error", () => {
    console.error("Need to finish test");
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

  it("Should show success messsage after loading is completed", async () => {
    const loading = ref(true);

    const { queryByRole } = render(ButtonComponent, {
      props: { label: "button", loading: loading },
    });

    loading.value = false;
    waitFor(() => {
      expect(queryByRole("img", { name: "loading icon" })).toBeDefined();
      console.log(queryByRole("img", { name: "loading icon" }));
    });
  });
});
