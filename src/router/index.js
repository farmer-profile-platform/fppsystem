import Vue from "vue";
import VueRouter from "vue-router";
import is from "is_js";
import { store } from "../store/";
import authService from "../api/auth";

import Main from "@/containers/Main.vue";
import Dashboard from "@/views/Dashboard.vue";
import Farmers from "@/views/Farmers";
import FarmInputSupport from "@/views/FarmInputSupport"
import AddFarmer from "@/views/AddFarmer";
import FarmerProfile from "@/views/FarmerProfile";
import Users from "@/views/Users";
import UserProfile from "@/views/UserProfile"
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
        path: "/farmer-input-support",
        name: "Farm Input Support",
        component: FarmInputSupport
      },
      {
        path: "/add-farmer",
        name: "Add Farmer",
        component: AddFarmer
      },
      {
        path: "/farmer-profile/:id",
        name: "Farmer Profile",
        component: FarmerProfile
      },
      {
        path: "/users",
        name: "Users",
        component: Users
      },
      {
        path: "/user-profile",
        name: "User Profile",
        component: UserProfile
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
  linkActiveClass: "open active",
  routes
});

router.beforeEach((to, from, next) => {
  let openViews = ["login"];
  let canAccess =
    is.inArray(to.name, openViews) ||
    authService.validAuth(store.getters.userLoggedIn);
  return canAccess ? next() : next("/login");
});

export default router;
