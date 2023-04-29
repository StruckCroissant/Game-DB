import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import HomeView from "@/views/HomeView.vue";
import { useAuthenticationStore } from "@/stores/authentication";
import { storeToRefs } from "pinia";
/**
 * Routes section
 */
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
/**
 * Router setup
 */
router.beforeEach((to, from, next) => {
    const authStore = useAuthenticationStore();
    const { isAuthenticated } = storeToRefs(authStore);
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated.value) {
            next({ name: 'login' });
        }
        else {
            next();
        }
    }
    else {
        next();
    }
});
export default router;
//# sourceMappingURL=index.js.map