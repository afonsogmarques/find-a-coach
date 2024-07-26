import { createApp, defineAsyncComponent } from 'vue';

import App from './App.vue';
import router from './router';
import pinia from './stores/index.js';

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';

const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'));

const app = createApp(App);

app
  .component('BaseCard', BaseCard)
  .component('BaseButton', BaseButton)
  .component('BaseBadge', BaseBadge)
  .component('BaseSpinner', BaseSpinner)
  .component('BaseDialog', BaseDialog)
  .use(pinia)
  .use(router)
  .mount('#app');
