import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import type { RouteRecordRaw } from "vue-router";
import { logout } from "@/services/authentication/authenticationService";

export const RouteNames = {
  AUTH: "auth",
  LOGIN: "login",
  LOGOUT: "logout",
  HOME: "home",
  REGISTER: "register",
};

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/auth",
    name: RouteNames.AUTH,
    redirect: RouteNames.LOGIN,
  },
  {
    path: "/logout",
    name: RouteNames.LOGOUT,
    beforeEnter(to, from, next) {
      logout();
      next({ name: RouteNames.LOGIN });
    },
  },
  {
    path: "/home",
    name: RouteNames.HOME,
    component: HomeView,
    meta: {
      requiresAuth: true,
      title: "Home",
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
  {
    path: "/:pathMatch(.*)*",
    redirect: { path: "/login" },
  },
];
