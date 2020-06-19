import Vue from "vue";
import VueRouter from "vue-router";

import Main from "@/containers/Main.vue";
import Dashboard from "@/views/Dashboard.vue";
import Farmers from "@/views/Farmers";
import AddFarmer from "@/views/AddFarmer"
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
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "/farmers",
        name: "Farmers Profile List",
        component: Farmers
      },
      {
        path: "/add-farmer",
        name: "Add Farmer",
        component: AddFarmer
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
