import { createPinia } from "pinia";
import { createRouter } from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { createApp } from "./mount";
import "@/styles/main.scss";

import type {
  Library,
  IconDefinition,
} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

function setupFontAwesomeLibrary(
  library: Library,
  definitions: Array<IconDefinition>
): void {
  definitions.forEach((iconDefinition) => library.add(iconDefinition));
}

setupFontAwesomeLibrary(library, [faUserSecret]);

function mount(): void {
  if (import.meta.env.DEV && import.meta.env.API_ENABLE_MOCKS === "true") {
    import("../mocks/browser").then(({ startWorker }) => {
      startWorker();
    });
  }

  const app = createApp();
  const router = createRouter();
  const pinia = createPinia();

  app.use(router);
  app.use(pinia);
  app.component("FontAwesomeIcon", FontAwesomeIcon);
  app.mount("#app");
}

mount();
