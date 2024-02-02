import { render as tlRender, fireEvent } from "@testing-library/vue";
import InputComponent from "./InputComponent.vue";
import type { RenderOptions } from "@testing-library/vue";

const render = (options: RenderOptions) => tlRender(InputComponent, options);

describe("InputComponent tests", () => {
  it("Should have a placeholder", () => {
    const { getByRole } = render({
      props: { name: "username", label: "Username" },
    });

    const button = getByRole("textbox", { name: "Username" });
  });

  it("Should hide password text", async () => {
    const { getByPlaceholderText, getByLabelText, getByRole } = render({
      props: { name: "username", label: "Password", type: "password" },
    });

    getByPlaceholderText("Password");
    const icon = getByLabelText("show password");

    await fireEvent.click(icon);
    getByRole("textbox", { name: "Password" });
  });

  it("Should show an error message", () => {
    const { getByDisplayValue } = render({
      props: { name: "username", label: "Username" },
    });

    // TODO will have to render this in a form context
    // see https://testing-library.com/docs/vue-testing-library/api/#rendercomponent-options
  });
});
