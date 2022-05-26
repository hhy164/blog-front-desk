<template>
  <Layout class="test-container">
    <template #left>
      <div class="left"></div>
    </template>
    <div class="main"></div>
    <template #right>
      <div class="right"></div>
    </template>
  </Layout>
</template>
<script>
import Layout from "./index.vue";
export default {
  components: {
    Layout
  }
};
</script>

<style scoped>
.left{
    width:20%;
    height:100vh;
    background:orange;
}
.main{
    width:60vw;
    height:100vh;
    background:lightblue;
}
.right{
    width:20vw;
    height:100vh;
    background:orange;
}
</style>