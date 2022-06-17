<template>
  <nav class="menu-container">
    <RouterLink :exact="item.exact"
      active-class="active"
     :to="{name:item.name}" v-for="item in items" :key="item.link">
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{item.title}}</span>
    </RouterLink>
  </nav>
</template>

<script>
import Icon from "../../Icon";
export default {
  components: {
    Icon
  },
  data() {
    return {
      items: [
        { name: "Home", title: "首页", icon: "home" ,exact:true},
        {
          name: "Blog",
          title: "文章",
          icon: "blog",
          exact: false //激活状态是否要精确匹配
        },
        { name: "About", title: "关于我", icon: "about",exact:true },
        { name: "Project", title: "项目&效果", icon: "code" ,exact:true},
        { name: "Message", title: "留言板", icon: "chat",exact:true }
      ]
    };
  },

};
</script>

<style scoped lang="less">
@import "../../../styles/var.less";
@import "../../../styles/global.less";
.menu-container {
  color: @gray;
  margin: 24px 0;
  .active {
    background: darken(@words, 3%);
  }
  a {
    padding: 0 50px;
    display: block;
    display: flex;
    align-items: center;
    height: 45px;
    .icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
  }
}
</style>