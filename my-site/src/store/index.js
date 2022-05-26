import {Store,install} from "vuex";
import Vue from "vue";
import banner from "./banner";
import setting from "./setting";
import about from "./about";
import project from "./project";
if(!window.Vuex){
    install(Vue);
}
// 导出仓库
export default new Store({
    modules:{
        banner,
        setting,
        about,
        project
    },
    strict:true,
})