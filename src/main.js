import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import pinia from './stores/index.js';

const app = createApp(App);

app
  .use(pinia)
  .use(router)
  .mount('#app');
