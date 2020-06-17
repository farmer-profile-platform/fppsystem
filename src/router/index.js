import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/containers/Main.vue";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home",
    component: Main,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
