import { createPinia } from "pinia";
import { makeRouter } from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { mount } from "./mount";
import { configs as appConfigs } from "./configs";
import { configs as routerConfigs } from "./router/configs";
import "@/styles/main.scss";

import type {
  Library,
  IconDefinition,
} from "@fortawesome/fontawesome-svg-core";

function setupFontAwesomeLibrary(
  library: Library,
  definitions: Array<IconDefinition>
): void {
  definitions.forEach((iconDefinition) => library.add(iconDefinition));
}

setupFontAwesomeLibrary(library, [faUserSecret]);

mount(
  {
    router: makeRouter(),
    pinia: createPinia(),
  },
  {
    appConfigs: appConfigs,
    routerConfigs: routerConfigs,
  }
);
