import NavigationModalComponent from "./NavigationModalComponent.vue";
import { render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { useRouter } from "vue-router";
import type { Router } from "vue-router";
import { userEvent } from "@testing-library/user-event";

vi.mock("vue-router");

describe("Navigation modal component tests", () => {
  vi.mocked(useRouter as () => Pick<Router, "push">).mockReturnValue({
    push: vi.fn(),
  });

  it("Should render contents in all slots", async () => {
    const headerSlotContent = "<div>header</div>";
    const defaultSlotContent = "<div>body</div>";
    const footerSlotContent = "<div>footer</div>";

    const { queryByTestId } = render(NavigationModalComponent, {
      slots: {
        header: headerSlotContent,
        default: defaultSlotContent,
        footer: footerSlotContent,
      },
    });

    expect(queryByTestId("back-link")).toBeInTheDocument();
    // Note: these could probably be done with role selectors
    expect(queryByTestId("modal-header")).toContainHTML(headerSlotContent);
    expect(queryByTestId("modal-body")).toContainHTML(defaultSlotContent);
    expect(queryByTestId("modal-footer")).toContainHTML(footerSlotContent);
  });

  it("Should push to router when clicking back link", async () => {
    const { getByTestId } = render(NavigationModalComponent);

    const backLink = getByTestId("back-link");
    await userEvent.click(backLink);
    expect(useRouter().push).toHaveBeenCalledWith({ name: "login" });
  });
});
