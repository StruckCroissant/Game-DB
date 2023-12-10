import { createApp } from "vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router";
import "@/styles/main.scss";
import errorHandler from "@/services/errorHandler";
library.add(faUserSecret);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.config.errorHandler = (err: unknown) => {
  errorHandler.errorGuard(err);
};

app.mount("#app");
