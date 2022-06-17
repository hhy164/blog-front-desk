// 获取某个组件渲染的dom元素
import Vue from "vue";
/**
 * 
 * @param {表示要获取的组件} comp 
 * @param {表示组件要填的属性object} props 
 */
export default function (comp,props){
    const vm = new Vue({
        render:h=>h(comp,{props})
    })
    vm.$mount();
    return vm.$el;
}
