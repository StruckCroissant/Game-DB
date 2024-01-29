import { render } from "@testing-library/vue";
import InputComponent from "./InputComponent.vue";

describe("InputComponent tests", () => {
  it("Should have a placeholder", () => {
    const { getByPlaceholderText } = render(InputComponent, {
      props: { name: "Username", placeholder: "Username" },
    });

    getByPlaceholderText("Username");
  });
});
