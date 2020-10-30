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
            tabName: 'analysis',
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
        return [
          { name: 'Analysis', root: 'analysis', route: '/dashboard/analysis' },
          {
            name: 'Activity Log',
            root: 'activity',
            route: '/dashboard/activity',
          },
        ];
      },
    },
  },
};
</script>
