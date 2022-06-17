<template>
  <div class="image-loader-container">
    <img v-if="!everythingDone" class="placeholder" :src="placeholder" alt />
    <img
      @load="handleLoad"
      :src="src"
      alt
      :style="{opacity:originOpacity,transition:`${duration}ms`}"
    />
    <!-- 这里img的load事件是自带的,表示图片加载完成时 -->
  </div>
</template>

<script>
export default {
  methods: {
    handleLoad() {
      this.originLoaded = true;
      setTimeout(() => {
        //要等所有的都加载好了以后,占位图再消失
        //不然占位图就会提前消失会出现一下空白
          this.everythingDone = true;
          this.$emit("load");
      }, this.duration);
    }
  },
  data() {
    return {
      originLoaded: false, //原图是否加载完成
      everythingDone: false //是否一切都加载完成
    };
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    }
  },
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 500
    }
  }
};
</script>

<style scoped lang="less">
@import "../../styles/mixin.less";
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden; //因为后面虚化会造成溢出,所以要溢出部分隐藏
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    // 给占位图一个虚化
    filter: blur(2vw);
  }
}
</style>