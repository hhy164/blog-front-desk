// 入口文件
import "./mock";
import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
import router from "./router";
import "./eventBus";
import { showMessage } from "./utils/index";
import store from "./store/index";
store.dispatch("setting/fetchSetting");
Vue.prototype.$showMessage = showMessage; //把这个方法注入到vue实例中

// 注册全局指令
import vLoading from "./directives/loading";
Vue.directive("loading",vLoading);
import vLazy from "./directives/lazy";
Vue.directive("lazy",vLazy);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

