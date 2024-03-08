import { mount } from "@vue/test-utils";
import App from "./App.vue";
import ToastComponent from "@/components/UI/ToastComponent.vue";
import { RouterView, createRouter, createWebHistory } from "vue-router";
import { routes } from "./router/routes";
import { createPinia, setActivePinia } from "pinia";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe("Base app component tests", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Should render successfully", () => {
    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    const toastComponent = wrapper.findComponent(ToastComponent);
    const routerView = wrapper.findComponent(RouterView);

    expect(toastComponent.exists()).toBe(true);
    expect(routerView.exists()).toBe(true);
  });
});
