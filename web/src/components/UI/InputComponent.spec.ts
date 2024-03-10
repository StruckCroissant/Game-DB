import type { Component } from "vue";
import { render, fireEvent, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import InputComponent from "./InputComponent.vue";
import "@testing-library/jest-dom";
import { getExtendedComponent } from "@/utilities/testHelpers";

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

    expect(getByRole("textbox", { name: "username" })).toBeDefined();
  });

  it("Should hide password text", async () => {
    const { getByPlaceholderText, getByLabelText, getByRole } = render(
      InputComponentWrapped,
      {
        props: { name: "password", label: "Password", type: "password" },
      }
    );

    expect(getByPlaceholderText("Password")).toBeDefined();
    const icon = getByLabelText("show password");

    await fireEvent.click(icon);
    expect(getByRole("textbox", { name: "password" })).toBeDefined();
  });

  it("Should show an error message", async () => {
    const props = { name: "username", label: "Username", initialValue: "" };

    const { getByRole } = render(InputComponentWrapped, {
      props: props,
    });
    const input = getByRole("textbox", { name: "username" });
    await userEvent.type(input, " ");
    await waitFor(() => {
      expect(
        getByRole("alert", { name: /username-error.*/i })
      ).toBeInTheDocument();
    });
  });
});
