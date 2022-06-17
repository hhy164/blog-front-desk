<template>
  <ul class="contact-container">
    <li>
      <a target="_blank" :href="data && data.github">
        <div class="icon">
          <Icon type="github" />
        </div>
        <span>{{ data && data.githubName }}</span>
      </a>
    </li>
    <li>
      <a :href="`mailto:${data && data.mail}`">
        <div class="icon">
          <Icon type="mail" />
        </div>
        <span>{{ data && data.mail }}</span>
      </a>
      <!-- <div class="pop">
        <img
          src="https://img1.baidu.com/it/u=3241674766,2894089859&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=750"
          style="width:150px;heght:150px"
        />
      </div>-->
    </li>
    <li>
      <a
        href="tencent://message/?Menu=yes&uin=3151499385&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45"
      >
        <div class="icon">
          <Icon type="qq" />
        </div>
        <!-- 杨馨雨的QQ -->
        <span>this is my QQ</span>
      </a>
      <div class="pop">
        <img
          src="https://img0.baidu.com/it/u=3270048148,2423814197&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          style="width: 150px; heght: 150px"
        />
      </div>
    </li>
    <li>
      <a href>
        <div class="icon weixin">
          <Icon type="weixin" />
        </div>
        <span v-if="data">{{ data.weixin }}</span>
      </a>
      <div class="pop">
        <img
          src="https://img0.baidu.com/it/u=3270048148,2423814197&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "../../Icon";
import { mapState } from "vuex";
export default {
  components: {
    Icon,
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style scoped lang="less">
@import "../../../styles/var.less";
@import "../../../styles/global.less";
.contact-container {
  list-style: none;
  padding: 20px;
  margin: 0;
  color: @gray;
  @itemHeight: 30px;
  li {
    height: @itemHeight;
    line-height: 30px;
    margin: 14px 0;
    position: relative;
    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
  }
  a {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
  }
  .icon {
    font-size: 26px;
    width: 36px;
    &.weixin {
      font-size: 32px;
      text-indent: -3px;
    }
  }
  .pop {
    position: absolute;
    left: 0;
    bottom: @itemHeight + 5px;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
    transform: scaleY(0);
    transform-origin: center bottom;
    transition: 0.3s;
    img {
      width: 150px;
      height: 150px;
    }
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translate(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background: #fff;
      bottom: -4px;
    }
  }
}
</style>