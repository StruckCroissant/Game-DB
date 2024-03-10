import { render } from "@testing-library/vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes";
import LoginView from "./LoginView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe("LoginView tests", () => {
  it("Should render", () => {
    const { container } = render(LoginView, {
      global: { plugins: [router] },
    });

    const content = container.querySelector("section");

    expect(content).not.toBeNull();
  });
});
