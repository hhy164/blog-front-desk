import LoadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";
// 得到el中是否存在loading效果的img元素
function getLoadingImage(el){
    return el.querySelector("img[data-role=loading]");

}
function createLoadingImg(){
    // 创建loading元素
    const img = document.createElement("img");
    img.dataset.role = "loading"; //设置一个自定义属性为loading
    img.src = LoadingUrl;
    img.className = styles.loading;
    return img;
}
// 导出指令的配置对象
export default function(el,binding){
    const curImg = getLoadingImage(el);
    // 根据binding.value的值,决定创建或删除img元素
    if(binding.value){
        if(!curImg){
            //如果没有img元素
            const img = createLoadingImg();
            el.appendChild(img);
        }
    }else{
        if(curImg){
            curImg.remove();
        }

    }
}