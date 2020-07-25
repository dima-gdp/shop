import Vue from 'vue';
import App from './App.vue';
import { var1, var2 } from './var';
import func from './func';

func(var1);
func(var2);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
