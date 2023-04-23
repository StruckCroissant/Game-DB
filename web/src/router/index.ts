import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import HomeView from "@/views/HomeView.vue";
import { useAuthenticationStore } from "@/stores/authentication";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: 'login',
    },
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthenticationStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.getIsAuthenticated()) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
