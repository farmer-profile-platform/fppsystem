import Vue from "vue";
import VueRouter from "vue-router";

import MainComponent from "../containers/Main";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Main",
    component: MainComponent,
    chiildren: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard
      }
    ]
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
