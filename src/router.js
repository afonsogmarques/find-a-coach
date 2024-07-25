import { createRouter, createWebHistory, routerKey } from "vue-router";

import CoachDetails from "./pages/coaches/CoachDetails.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import ReceivedRequests from "./pages/requests/ReceivedRequests.vue";
import NotFound from "./pages/NotFound.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import { useAuthStore } from "./stores";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', name: 'coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }
      ]
    },
    {
      path: '/register',
      component: CoachRegistration,
      beforeEnter: handleProtectedRoute
    },
    { path: '/requests', component: ReceivedRequests },
    {
      path: '/auth',
      name: 'auth',
      component: UserAuth,
      beforeEnter: protectLoginPage
    },
    { path: '/:catchAll(.*)', component: NotFound }
  ]
});

function handleProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return { name: 'auth' };
}

function protectLoginPage(_, _1, next) {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated
    ? next(false)
    : next();
}

export default router;