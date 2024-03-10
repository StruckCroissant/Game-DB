import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import type { RouteRecordRaw } from "vue-router";

export const RouteNames = {
  AUTH: "auth",
  LOGIN: "login",
  HOME: "home",
  REGISTER: "register",
};

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/:pathMatch(.*)*",
    redirect: { path: "/login" },
  },
  {
    path: "/auth",
    name: RouteNames.AUTH,
    redirect: RouteNames.LOGIN,
  },
  {
    path: "/home",
    name: RouteNames.HOME,
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    component: LoginView,
    path: "",
    children: [
      {
        path: "",
        redirect: RouteNames.LOGIN,
      },
      {
        path: "/login",
        name: RouteNames.LOGIN,
        component: LoginComponent,
      },
      {
        path: "/register",
        name: RouteNames.REGISTER,
        component: RegisterComponent,
      },
    ],
  },
];
