import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { titleController } from "@/utils";

if(!window.VueRouter){
  // 不存在VueRouter全局变量
  Vue.use(VueRouter);
}

const router = new VueRouter({
  // 配置
  routes,
  mode: "hash", //mode默认为hash
});
router.afterEach((to, from) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
})
export default router;

