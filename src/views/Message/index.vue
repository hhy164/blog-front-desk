<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import * as msgApi from "@/api/message.js";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  components: {
    MessageArea,
  },
  computed:{
    hasMore(){
      return this.data.rows.length < this.data.total;
    }
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  methods: {
    async fetchData() {
      return msgApi.getMessage(this.page, this.limit);
    },
    async handleSubmit(data, callback) {
      const resp = await msgApi.postMessage(data);
      callback("感谢您的留言");
      this.data.rows.unshift(resp);
    },
    async fetchMore() {
      if (!this.hasMore) {
        // 没有更多页了
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        // 表示目前正在加载更多
        return;
      }
      const range = 100; //定一个可接受的范围,在此范围内都算到达了底部
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        // 到达了底部
        this.fetchMore();
      }
    },
  },
};
</script>

<style scoped>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>