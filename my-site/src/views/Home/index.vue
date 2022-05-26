<template>
  <div class="home-container" 
  v-loading="loading"
  @wheel="handleWheel">
    <ul
      class="carousel-container"
      ref="container"
      :style="{
        marginTop,
      }"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in data" :key="item.id">
        <Carouselitem :carousel="item" />
      </li>
    </ul>

    <div v-show="index > 0" class="icon icon-up" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div
      v-show="index < data.length - 1"
      @click="switchTo(index + 1)"
      class="icon icon-down"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        :class="{
          active: index === i,
        }"
        @click="switchTo(i)"
        v-for="(item, i) in data"
        :key="item.id"
      ></li>
    </ul>
  </div>
</template>
<script>
import {mapState} from "vuex";
import Carouselitem from "./Carouselitem.vue";
import Icon from "../../components/Icon";
export default {
  components: {
    Carouselitem,
    Icon,
  },
  data() {
    return {
      index: 0, //表示当前显示的是第几张轮播图
      containerHeight: 0, //表示整个容器高度
      switching: false, //是否正在切换中
    };
  },
  methods: {
    handleWheel(e) {
      if (this.switching) {
        return;
      }

      if (e.deltaY > 0 && this.index < this.data.length - 1) {
        // 向下滚动
        this.switching = true;
        this.index++;
      } else if (e.deltaY < 0 && this.index > 0) {
        // 向上滚动
        this.switching = true;
        this.index--;
      }
    },
    switchTo(i) {
      // 切换轮播图
      this.index = i;
    },
    handleTransitionEnd() {
      this.switching = false;
    },
    handleResize(){
      // 当页面高度发生变化时进行一个监听,同时对容器高度进行改变
      this.containerHeight = this.$refs.container.clientHeight;
    }
  },
  created(){
    this.$store.dispatch("banner/fetchBanner");
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize",this.handleResize)
  },
  destroyed(){
    window.removeEventListener("resize",this.handleResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner",["loading","data"])
  },
  
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 500ms;
    li {
      width: 100%;
      height: 100%;
    }
  }
  .icon {
    @jump: 5px;
    @keyframes jump-up {
      0% {
        transform: translate(-50%, @jump);
      }
      50% {
        transform: translate(-50%, -@jump);
      }
      100% {
        transform: translate(-50%, @jump);
      }
    }
    @keyframes jump-down {
      0% {
        transform: translate(-50%, -@jump);
      }
      50% {
        transform: translate(-50%, @jump);
      }
      100% {
        transform: translate(-50%, -@jump);
      }
    }
    font-size: 30px;
    .self-center();
    color: @gray;
    cursor: pointer;
    transform: translateX(-50%);
    @gap: 15px;
    &.icon-up {
      top: @gap;
      animation: jump-up 2s infinite;
    }
    &.icon-down {
      top: auto;
      bottom: @gap;
      animation: jump-down 2s infinite;
    }
  }
  .indicator {
    .self-center();
    transform: translateY(-50%);
    left: auto;
    right: 25px;
    li {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: @words;
      cursor: pointer;
      margin-bottom: 10px;
      border: 1px solid #fff;
      box-sizing: border-box;
      &.active {
        background: #fff;
      }
    }
  }
}
</style>
