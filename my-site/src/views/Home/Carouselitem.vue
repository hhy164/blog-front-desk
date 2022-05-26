<template>
  <div class="carousel-item-container" ref="container" 
  @mousemove="handleMouseMove"
  @mouseleave="handleMouseLeave"
  >
    <div class="carousel-img" ref="image" :style="imagePosition">
      <!-- 等图片加载完成后再加载文字 -->
      <ImageLoader
        @load="this.showWords"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      />
    </div>
    <div class="title" ref="title">
      {{ carousel.title }}
    </div>
    <div class="desc" ref="desc">
      {{ carousel.description }}
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, //外层容器的尺寸
      innerSize: null, //里层图片的尺寸
      mouseX:0, //鼠标的横坐标
      mouseY:0, //鼠标的纵坐标
    };
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    // 挂载的时候最开始图片位于正,所以要设置鼠标位置在正中间
    this.mouseX = this.center.x;
    this.mouseY = this.center.y; 
    window.addEventListener("resize",this.setSize);
  },
  destroyed(){
    window.removeEventListener("resize",this.setSize);
  },
  methods: {
    
    handleMouseMove(e){
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave(){
      // 处理鼠标移出事件
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight,
      };
    },
    //调用该方法,显示文字
    showWords() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      // 强制让浏览器渲染一次,否则的话不会出现动画效果
      // 因为后面又一次设置了width，系统就会直接先读取到最后一个就不看之前设置的width
      // 所以前一次的设置就会是无效的
      this.$refs.title.clientWidth; //获取clientWidth会造成浏览器重新渲染 reflow
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      // desc同理
      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.$refs.desc.clientWidth; //获取clientWidth会造成浏览器重新渲染 reflow
      this.$refs.desc.style.transition = "2s 1s"; //第二个参数表示延迟1s
      this.$refs.desc.style.width = this.descWidth + "px";
    },
  },
  computed: {
      imagePosition(){
        if(!this.innerSize || !this.containerSize){
          // 最开始还没有挂载对象所以没有值,这时候直接返回
          return ;
        }
        // 等到有值了以后再重新运行下面的数据
        const extraWidth = this.innerSize.width - this.containerSize.width; //多出的宽度
        const extraHeight = this.innerSize.height - this.containerSize.height; //多出的高度
        const left = -extraWidth/this.containerSize.width*this.mouseX;
        const top = -extraHeight/this.containerSize.height*this.mouseY;
        return {
          transform:`translate(${left}px, ${top}px)`
        };
      },
      center(){
        return {
          x:this.containerSize.width/2,
          y:this.containerSize.height/2
        }
      }
    }
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.carousel-item-container {
  // background: @dark;
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
    overflow: hidden;
}
.carousel-img {
  width: 110%;
  height: 110%;
  position: absolute;

  left:0;
  top:0;
}
.title,
.desc {
  position: absolute;
  letter-spacing: 3px;
  left: 30px;
  color: #fff;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5), 0px -1px 0 rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
}
.title {
  top: calc(50% - 40px);
  font-size: 2em;
}
.desc {
  top: calc(50% + 20px);
  font-size: 1.2em;
  color: lighten(@gray, 20%);
}
</style>