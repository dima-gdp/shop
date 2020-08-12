import Vue from 'vue';
import Loader from '@/components/Loader.vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

Vue.config.productionTip = false;

Vue.component('Loader', Loader);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
