<template lang="pug">
    extends ../BaseView.pug
</template>

<script>
import Vue from 'vue';
import BaseView from '../BaseView';
import Home from './Home';
import Activity from './Activity';

Vue.component('home', { template: '<Home />' });
Vue.component('activity', { template: '<Activity />' });

let route = [];

export default {
  name: 'Dashboard',
  extends: BaseView,
  components: { Home, Activity },
  props: {
    pages: {
      type: Array,
      default: () => {
        return [
          {
            tabName: 'home',
            component: 'home',
          },
          {
            tabName: 'activity',
            component: 'activity',
          },
        ];
      },
    },
    tabs: {
      type: Array,
      default: () => {
        return route;
      },
    },
  },
  mounted() {
    this.tabs = this.$route.meta.tabs;
  },
};
</script>
