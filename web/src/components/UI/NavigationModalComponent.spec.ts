import NavigationModalComponent from "./NavigationModalComponent.vue";
import { render, getSuggestedQuery } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { useRouter } from "vue-router";

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Navigation modal component tests", () => {
  // TODO need to fix issue with FontAwesomeIcon component resolution

  it("Should render contents in all slots", async () => {
    const headerSlotContent = "<div>header</div>";
    const defaultSlotContent = "<div>body</div>";
    const footerSlotContent = "<div>footer</div>";

    const { queryByTestId, getByAltText, getByTestId } = render(
      NavigationModalComponent,
      {
        slots: {
          header: headerSlotContent,
          default: defaultSlotContent,
          footer: footerSlotContent,
        },
      }
    );

    expect(queryByTestId("back-link")).toBeInTheDocument();
    // Note: these could probably be done with role selectors
    expect(queryByTestId("modal-header")).toContainHTML(headerSlotContent);
    expect(queryByTestId("modal-body")).toContainHTML(defaultSlotContent);
    expect(queryByTestId("modal-footer")).toContainHTML(footerSlotContent);
  });

  it.skip("Should push to router when clicking back button", () => {
    throw new Error("need to do");
  });
});
