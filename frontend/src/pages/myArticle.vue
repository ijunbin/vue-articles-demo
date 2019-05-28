<template>
  <div class="article-page">
    <div
      v-if="articles.length > 0"
      class="ivu-col ivu-col-span-14 ivu-col-offset-2"
      style="margin-bottom:30px"
    >
      <articleItem
        v-for="detail in articles"
        :key="detail.id"
        :detail="detail"
        v-on:click.native="showDetail(detail)"
      ></articleItem>
      <Page :total="total" :page-size="perPage" @on-change="change"/>
    </div>
    <div v-if="articles.length == 0" style="text-align:center;margin-top:100px">
      <h2>{{tip}}</h2>
      <div style="width:160px;display:block;margin:0 auto">
        <Button style="margin-top:20px" type="success" long @click="writeArticle">马上分享</Button>
      </div>
    </div>
  </div>
</template>

<script>
import articleItem from "../components/articleItem";
import page from "../components/page";
import { mapState } from "vuex";
import * as types from "../store/mutation-types.js";

export default {
  data() {
    return {
      tip: "您还没有进行分享哦"
    };
  },
  methods: {
    async change(page) {
      await this.$store.dispatch("listMyArticle", { page });
    },
    showDetail(detail) {
      // 将页面数据放进store
      this.$store.commit(types.SHOW_DETAIL, detail);
      this.$router.push({
        path: `/article/${detail.id}`
      });
    },
    writeArticle() {
      // 判断是否已登陆
      let userInfo = this.$store.state.userInfo;
      if (!userInfo.account) {
        this.$Message.warning("请先登陆");
      } else {
        // 清空编辑数据
        this.$store.commit(types.CLEAR_EDIT);
        // 跳转到写文章页面
        this.$router.push({
          path: "/write-article",
          name: "writeArticle"
        });
      }
    }
  },
  computed: mapState({
    // 映射 this.count 为 store.state.count
    articles: state => state.myArticlePage.articles,
    total: state => state.myArticlePage.total,
    perPage: state => state.myArticlePage.perPage,
    pageNumber: state => state.myArticlePage.pageNumber
  }),
  async mounted() {
    await this.$store.dispatch("listMyArticle");
  },
  components: {
    articleItem,
    page
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.article-page {
  margin: 50px 0;
}
</style>
