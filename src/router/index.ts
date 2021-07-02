import { createRouter, createWebHistory } from "@ionic/vue-router";
import {
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import Tabs from "../views/Tabs.vue";
import { auth } from "../main";

const guard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  try {
    if (auth.currentUser?.uid) {
      next();
    } else {
      next("/");
    }
  } catch (error) {
    next("/");
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/trainer",
    component: () => import("@/views/Trainer.vue"),
    beforeEnter: guard,
  },
  {
    path: "/editor/:id",
    name: "editor",
    props: true,
    component: () => import("@/views/Editor.vue"),
  },
  {
    path: "/userhistory/:id",
    name: "userhistory",
    props: true,
    component: () => import("@/views/UserHistory.vue"),
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/tabs/home",
      },
      {
        path: "home",
        component: () => import("@/views/Home.vue"),
        beforeEnter: guard,
      },
      {
        path: "user",
        component: () => import("@/views/User.vue"),
      },
      {
        path: "history",
        component: () => import("@/views/History.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
