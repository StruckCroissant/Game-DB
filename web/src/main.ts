import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faUserSecret)
import App from './App.vue';
import router from './router';
// import { errorHandler } from '@/services/errorHandler';

import '@/styles/main.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.config.globalProperties
console.log(app);
// app.config.errorHandler = (err, instance, info) => {
//   console.error(`Error: ${err.toString()}\nInfo: ${info}`);
//   return;
// };

app.mount('#app');
