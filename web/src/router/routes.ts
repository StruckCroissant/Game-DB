import HomeView from "@/views/HomeView.vue";
import ForgotComponent from "@/components/ForgotComponent.vue";
import LoginView from "@/views/LoginView.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import type { RouteRecordRaw } from "vue-router";

export const routes: Readonly<RouteRecordRaw[]> = [
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
  }
];
