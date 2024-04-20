import { createPinia } from "pinia";
import { createRouter } from "./router";
import { createApp } from "./mount";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "@/styles/main.scss";

async function mount(): Promise<void> {
  if (import.meta.env.DEV && import.meta.env.API_ENABLE_MOCKS === "true") {
    const { startWorker } = await import("../mocks/browser");
    await startWorker();
  }

  const app = createApp();
  const router = createRouter();
  const pinia = createPinia();

  app.use(router);
  app.use(pinia);
  app.component("FontAwesomeIcon", FontAwesomeIcon);
  app.mount("#app");
}

await mount();
