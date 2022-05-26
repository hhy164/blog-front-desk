<template>
  <div class="empty-container">
    <Icon type="empty" />
    <p>{{text}}</p>
  </div>
</template>

<script>
import Icon from "../Icon";
export default {
  props: {
    text: {
      type: String,
      default: "无数据"
    }
  },
  components: {
    Icon
  }
};
</script>

<style scoped lang="less">
@import "../../styles/mixin.less";
@import "../../styles/var.less";
// 颜色用颜色变量里面的值来设置
.empty-container {
  .self-center();
  text-align: center;
  color: @gray;
  .icon-container {
    font-size: 72px;
    color: @gray;
  }
  p{
      font-weight: bold;
  }
}
</style>