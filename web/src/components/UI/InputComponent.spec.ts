import type { Component } from "vue";
import { render, fireEvent, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import InputComponent from "./InputComponent.vue";
import { getExtendedComponent } from "../../../utilities/test/helpers";

const mockFormData = {
  validationSchema: {
    username(value: string) {
      if (value && value.trim()) {
        return true;
      }

      return "required";
    },
  },
};

const InputComponentWrapped: Component = getExtendedComponent(InputComponent, {
  mockFormData,
});

describe("UI Tests", () => {
  it("Should have a placeholder", () => {
    const { getByRole } = render(InputComponentWrapped, {
      props: { name: "username", label: "Username" },
    });

    expect(getByRole("textbox", { name: "Username" })).toBeDefined();
  });

  it("Should hide password text", async () => {
    const { getByPlaceholderText, getByLabelText, getByRole } = render(
      InputComponentWrapped,
      {
        props: { name: "username", label: "Password", type: "password" },
      }
    );

    expect(getByPlaceholderText("Password")).toBeDefined();
    const icon = getByLabelText("show password");

    await fireEvent.click(icon);
    expect(getByRole("textbox", { name: "Password" })).toBeDefined();
  });

  it("Should show an error message", async () => {
    const props = { name: "username", label: "Username", initialValue: "" };

    const { getByRole, getByText } = render(InputComponentWrapped, {
      props: props,
    });
    const input = getByRole("textbox", { name: "Username" });
    await userEvent.type(input, " ");
    await waitFor(() => {
      expect(getByText("required")).toBeDefined();
    });
  });
});
