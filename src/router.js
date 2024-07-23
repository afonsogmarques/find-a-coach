import { createRouter, createWebHistory } from "vue-router";

import CoachDetails from "./pages/coaches/CoachDetails.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import ContactCoach from "./pages/coaches/requests/ContactCoach.vue";
import RequestsReceived from "./pages/coaches/requests/RequestsReceived.vue";
import NotFound from "./pages/NotFound.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    { 
      path: '/coaches/:id', 
      component: CoachDetails, 
      children: [
        { path: 'contact', component: ContactCoach } // coaches/c1/contact
      ]
    },
    { path: '/register', component: CoachRegistration },
    { path: '/requests', component: RequestsReceived },
    { path: '/:catchAll(.*)', component: NotFound }
  ]
});