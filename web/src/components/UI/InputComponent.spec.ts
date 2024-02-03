import { render as tlRender, fireEvent, waitFor } from "@testing-library/vue";
import InputComponent from "./InputComponent.vue";
import { FormContext, FormContextKey, useForm } from "vee-validate";
import type { RenderOptions } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { Component } from "vue";
import { getExtendedComponent } from "~/test/helpers";

const mockFormCallback = () =>
  useForm({
    validationSchema: {
      username(value: string) {
        if (value && value.trim()) {
          return true;
        }

        return "required";
      },
    },
  });

const ComponentWithNewSetup: Component = getExtendedComponent(InputComponent, {
  mockFormCallback,
});
const render = (options: RenderOptions) =>
  tlRender(ComponentWithNewSetup, options);
const user = userEvent.setup();

describe("InputComponent tests", () => {
  it("Should have a placeholder", () => {
    const { getByRole } = render({
      props: { name: "username", label: "Username" },
    });

    expect(getByRole("textbox", { name: "Username" })).toBeDefined();
  });

  it("Should hide password text", async () => {
    const { getByPlaceholderText, getByLabelText, getByRole } = render({
      props: { name: "username", label: "Password", type: "password" },
    });

    expect(getByPlaceholderText("Password")).toBeDefined();
    const icon = getByLabelText("show password");

    await fireEvent.click(icon);
    expect(getByRole("textbox", { name: "Password" })).toBeDefined();
  });

  it("Should show an error message", async () => {
    const errorMessage = "string is requred";
    const fieldName = "username";
    const props = { name: fieldName, label: "Username", initialValue: "" };

    const { getByRole, getByText } = render({
      props: props,
    });
    const input = getByRole("textbox", { name: "Username" });
    user.type(input, " ");
    await waitFor(() => {
      expect(getByText("required")).toBeDefined();
    });
    // TODO will have to render this in a form context
    // see https://testing-library.com/docs/vue-testing-library/api/#rendercomponent-options
  });
});
