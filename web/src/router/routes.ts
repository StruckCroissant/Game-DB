import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import type { RouteRecordRaw } from "vue-router";

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/:pathMatch(.*)*",
    redirect: { path: "/login" },
  },
  {
    path: "/auth",
    name: "auth",
    redirect: "login",
  },
  {
    path: "/home",
    name: "home",
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
        redirect: "login",
      },
      {
        path: "/login",
        name: "login",
        component: LoginComponent,
      },
      {
        path: "/register",
        name: "register",
        component: RegisterComponent,
      },
    ],
  },
];
