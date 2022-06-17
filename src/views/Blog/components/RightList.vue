<template>
  <ul class="right-list-container">
    <li  v-for="(item, i) in list" :key="i">
      <span :class="{ active: item.isSelect }"
      @click="handleClick(item)">
          {{ item.name }}
      </span>
      <span v-if="item.aside" class="aside"
      :class="{ active: item.isSelect }"
      @click="handleClick(item)">
        {{item.aside}}
      </span>
      <RightList :list="item.children"
      @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    // [{name:'xx',isSelect:true, children:[{name:'yy'},isSelect:true]}]
    list: {
      type: Array,
      default: () => [], //默认值是一个数组或者对象的，需要写成一个函数，返回值就是默认值
    },
  },
  methods:{
      handleClick(item){
        if(!item.isSelect){
          this.$emit("select",item)
        }
          // this.$emit("select",item);//抛出事件给父级,让父级去处理
      },
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.right-list-container {
  list-style: none;
  padding: 0;
  .right-list-container {
    margin-left: 1em; 
  }
  li {
      min-height: 40px;
      line-height: 40px;
      cursor:pointer;
      .active{
          color:@warn;
          font-weight:bold;
      }
    }

}
.aside{
  font-size:12px;
  margin-left:1em;
  color:@gray;
}
</style>