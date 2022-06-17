<template>
  <div class="siteAside-container">
    <Avatar
      url="https://img2.baidu.com/it/u=723209330,1385986041&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360"
    />
    <h1 class="title">hhy的blog</h1>
    <Menu />
    <Contact />
    <p class="footer">{{data && data.icp}}</p>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Avatar from "../Avatar/index.vue";
import Menu from "./Menu/index.vue";
import Contact from "./Contact/index.vue";
export default {
  components: {
    Avatar,
    Menu,
    Contact
  },
  computed:mapState("setting", ["data"]),
};
</script>

<style scoped lang="less">
@import "../../styles/var.less";
.siteAside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  // 设置的超出部分出现滚动条滚动
  .avatar-container {
    margin: 0 auto;
  }
  .footer {
    text-align: center;
    font-size: 12px;
  }
  .title{
      font-size:1.2em;
      color:#fff;
      text-align:center;
  }

}
</style>