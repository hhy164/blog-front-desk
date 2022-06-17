<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import {debounce} from "@/utils/index";
export default {
  components:{
    RightList,
  },
  props:{
    toc:{
      type:Array,
    }
  },
  data(){
    return {
      activeAnchor:""
    }
  },
  created(){
    this.setSelectDebounce = debounce(this.setSelect,50)
    this.$bus.$on("mainScroll",this.setSelectDebounce);
  },
  destroyed(){
    this.$bus.$off("mainScroll",this.setSelectDebounce);

  },
  methods:{
    handleSelect(item){
      location.hash = item.anchor;
    },
    // 设置activeAnchor为正确的值
    setSelect(scrollDom){
      if(!scrollDom){
        return;
      }
      this.activeAnchor =""; //由于后续要重新设置，先清空之前的状态
      const range = 200;
      for(const dom of this.doms){
        // 看看当前这个dom元素是否应该被选中
        if(!dom){
          // 如果dom元素不存在
          continue; //进入下次循环
        }
        // 得到元素离视口顶边的距离
        const top = dom.getBoundingClientRect().top
        if(top>=0 && top<=range){
          // 在这个范围内就被选中
          this.activeAnchor=dom.id;
          return;

        }else if(top>range){
          // 在规定的范围下方
          return; //不是激活状态
        }else{
          // 在规定的范围上方,如果还没到下一个激活的就仍然激活
          this.activeAnchor = dom.id; //先假设自己是激活的再看后面
        }
      }
    }
  },
  computed:{
    // 根据toc属性以及activeAnchor得到带有isSelect数组的toc数组
    tocWithSelect(){
      const getToc = (toc=[])=>{
        return toc.map(t=>({
          ...t,
          isSelect:t.anchor===this.activeAnchor,
          children:getToc(t.children),
        }))
      }
      return getToc(this.toc);
    },
    // 根据toc得到它们对应的元素数组
    doms(){
      const doms = [];
      const addToDoms = toc =>{
        for(const t of toc){
          doms.push(document.getElementById(t.anchor));
          if(t.children && t.children.length){
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    }
  }

}
</script>
<style scoped lang="less">
.blog-toc-container {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>