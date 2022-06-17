<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.layout-container{
    width: 100%;
    height:100%;
    display: flex;
    .left,.right{
        flex:0 0 auto;
        // 表示不能拉长也不能压缩,保持宽度自适应
        overflow:hidden;
    }
    .main{
        flex:1 1 auto;
        // 主区域可以拉长也可以压缩
        overflow:hidden;
    }
}

</style>