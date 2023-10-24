import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vuelidate from 'vuelidate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import '@/styles/main.scss';
library.add(faUserSecret);


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Vuelidate);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
