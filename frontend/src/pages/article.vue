<template>
  <div class="article-page">
    <div class="ivu-col ivu-col-span-14 ivu-col-offset-2" style="margin-bottom:30px">
      <Input
        search
        v-model="labels"
        enter-button="查询"
        style="width:70%;margin-bottom:30px"
        @click.native="search"
        placeholder="输入标题或标签搜索"
      />
      <articleItem
        v-for="detail in articles"
        :key="detail.id"
        :detail="detail"
        v-on:click.native="showDetail(detail)"
      ></articleItem>
      <Page :total="total" :page-size="perPage" @on-change="change"/>
    </div>
    <div class="ivu-col ivu-col-span-6" v-if="isLogin">
      <div style="width:320px">
        <Card>
          <div style="text-align:center">
            <h4 style="margin:5px 0px">个人信息</h4>
            <Divider dashed/>
            <div style="margin-left:20px;text-align:left">
              <p>昵称: {{nickname}}</p>
              <p v-if="hobby">爱好: {{hobby}}</p>
              <p v-if="email">邮箱: {{email}}</p>
              <p>性别: {{sex}}</p>
            </div>
          </div>
        </Card>
        <Button style="margin-top:20px" type="success" long @click="writeArticle">分享书籍</Button>

        <div style="margin-top:350px">
          <Card>
            <div style="text-align:center">
              <h4 style="margin:15px 0px">系统介绍</h4>
              <Divider dashed/>
              <p>{{introduction}}</p>
            </div>
          </Card>
        </div>
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
      labels: "",
      introduction:
        "这是由jff开发的一个用于各位电子书籍爱好者分享图书的一个平台，希望各位用户能够在这里找到自己需要的图书，谢谢大家！"
    };
  },
  methods: {
    async search() {
      await this.$store.dispatch("listArticle", { labels: this.labels });
    },
    async change(page) {
      await this.$store.dispatch("listArticle", { page, labels: this.labels });
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
    },
    showDetail(detail) {
      // 将页面数据放进store
      this.$store.commit(types.SHOW_DETAIL, detail);
      this.$router.push({
        path: `/article/${detail.id}`
      });
    }
  },
  computed: mapState({
    // 映射 this.count 为 store.state.count
    articles: state => state.articlePage.articles,
    total: state => state.articlePage.total,
    perPage: state => state.articlePage.perPage,
    pageNumber: state => state.articlePage.pageNumber,
    isLogin: state => !!state.userInfo.nickname,
    nickname: state => state.userInfo.nickname,
    hobby: state => state.userInfo.hobby,
    email: state => state.userInfo.email,
    sex: state => (!state.userInfo.sex || state.userInfo.sex == 1 ? "男" : "女")
  }),
  async mounted() {
    await this.$store.dispatch("listArticle");
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
