import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import Index from "./views/index.vue";
import Magic from "./views/magic.vue";
import NotFound from "./views/404.vue";
import Layout from "./views/layouts/index.vue";

import store from "./store/index.js"

import "./assets/index.css";


const routes = [
  { path: "/", component: Index },
  { path: "/magic", component: Magic },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(Layout).use(router).use(store).mount("#app");
