import ModalComponent from "./ModalComponent.vue";
import { render } from "@testing-library/vue";

describe("Modal component tests", () => {
  it("Should render content in slots", () => {});
  const headerSlotContent = "<div>header</div>";
  const defaultSlotContent = "<div>default</div>";
  const footerSlotContent = "<div>footer</div>";

  const { getByTestId } = render(ModalComponent, {
    slots: {
      header: headerSlotContent,
      default: defaultSlotContent,
      footer: footerSlotContent,
    },
  });

  expect(getByTestId("modal-header").innerHTML).toEqual(headerSlotContent);
  expect(getByTestId("modal-body").innerHTML).toEqual(defaultSlotContent);
  expect(getByTestId("modal-footer").innerHTML).toEqual(footerSlotContent);
});
