import Vue from "vue";
import App from "./App.vue";
import mixin from './mixins';
import router from "./router";
import { store } from "./store/";
import vueHeadful from 'vue-headful'

import "@/assets/css/base.css";
import "./plugins/element/index.js";
import "./registerServiceWorker";

Vue.mixin(mixin)
Vue.config.productionTip = false;
Vue.component('vue-headful', vueHeadful)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
