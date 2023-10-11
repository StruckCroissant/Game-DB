import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import HomeView from "@/views/HomeView.vue";
import { useAuthenticationStore } from "@/stores/authentication";
import { storeToRefs } from "pinia";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import ForgotComponent from "../components/ForgotComponent.vue";
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
            component: LoginView,
            path: '',
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: LoginComponent
                },
                {
                    path: '/register',
                    name: 'register',
                    component: RegisterComponent
                },
                {
                    path: '/forgot',
                    name: 'forgot',
                    component: ForgotComponent
                }
            ],
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
            next({ name: 'auth' });
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