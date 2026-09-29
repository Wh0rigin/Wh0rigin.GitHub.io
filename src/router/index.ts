import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/replica",
    name: "replica",
    component: () => import("../views/ReplicaView.vue"),
  },
  {
    path: '/:catchAll(.*)',
    name: "notfound",
    component: import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
