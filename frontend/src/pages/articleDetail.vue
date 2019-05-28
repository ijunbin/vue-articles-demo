<template>
  <div class="vertical-center-modal">
    <Card style="width:60%">
      <div class="info">
        <div>
          <Icon type="md-person"/>
          &nbsp;&nbsp;作者: {{author.nickname}}
        </div>
        <div>
          <Icon type="md-create"/>
          &nbsp;&nbsp;发布时间: {{createTime}}
        </div>
        <div>
          <Icon type="md-thumbs-up"/>
          &nbsp;&nbsp;点赞人数: {{upvoteCount}}
        </div>
        <div>
          <Icon type="ios-pricetags"/>
          &nbsp;&nbsp;标签: 
          <span v-for="(label,index) in labels">&nbsp;{{label}} &nbsp; | &nbsp;&nbsp;</span>
        </div>
      </div>
      <br>
      <br>
      <div class="resource">
        <div v-if="url">
          <Icon type="md-share"/>&nbsp;&nbsp;资源链接: {{url}}
        </div>
      </div>
      <p slot="title" style="font-size:20px">{{title}}</p>
      <div class="content">{{content}}</div>
      <div>
        <Button type="success" @click="upvote()" v-if="!upvoted">点赞</Button>
        <Button type="warning" @click="unupvote()" v-if="upvoted">取消点赞</Button>
        <Button type="info" @click="update()" v-if="self">编辑</Button>
        <Button type="error" @click="del()" v-if="self">删除</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as types from "../store/mutation-types.js";
import moment from "moment";

export default {
  data() {
    return {};
  },
  methods: {
    async upvote() {
      let res = await this.$store.dispatch("upvote", this.id);
      if (res) {
        this.$Message.error(res);
      } else {
        this.$Message.success("点赞成功");
        this.$store.commit(types.UPVOTE_SUCCESS);
      }
    },
    async unupvote() {
      let res = await this.$store.dispatch("unupvote", this.id);
      if (res) {
        this.$Message.error(res);
      } else {
        this.$Message.success("取消成功");
        this.$store.commit(types.UN_UPVOTE_SUCCESS);
      }
    },
    // 删除文章
    async del() {
      let res = await this.$store.dispatch("delarticle", this.id);
      if (res) {
        this.$Message.error(res);
      } else {
        this.$Message.success("删除成功");
        // 跳转到我的页面
        this.$router.push("/my-article");
      }
    },
    // 更新文章
    update() {
      let editdata = {
        title: this.title,
        content: this.content,
        url: this.url,
        id: this.id,
        labels: this.labels
      };
      this.$store.commit(types.EDIT_ARTICLE, editdata);
      // 跳转到我的页面
      this.$router.push("/write-article");
    }
  },
  //   computed: mapState({
  //     // 映射 this.count 为 store.state.count
  //     id: state => state.articleDetailPage.id,
  //     title: state => state.articleDetailPage.title,
  //     author: state => state.articleDetailPage.author,
  //     upvoteCount: state => state.articleDetailPage.upvoteCount,
  //     content: content => state.articleDetailPage.content,
  //     createTime: state => state.articleDetailPage.createTime,
  //     url: state => state.articleDetailPage.url
  //   }),
  computed: {
    id() {
      return this.$store.state.articleDetailPage.id;
    },
    title() {
      return this.$store.state.articleDetailPage.title;
    },
    author() {
      return this.$store.state.articleDetailPage.author;
    },
    upvoteCount() {
      return this.$store.state.articleDetailPage.upvoteCount;
    },
    content() {
      return this.$store.state.articleDetailPage.content;
    },
    labels() {
      return this.$store.state.articleDetailPage.labels;
    },
    createTime() {
      return moment
        .unix(this.$store.state.articleDetailPage.createTime)
        .format("YYYY-MM-DD hh:mm:ss");
    },
    url() {
      return this.$store.state.articleDetailPage.url;
    },
    upvoted() {
      return this.$store.state.articleDetailPage.upvoted;
    },
    self(){
        return this.$store.state.articleDetailPage.author.account == this.$store.state.userInfo.account;
    }
  },
  mounted() {}
};
</script>


<style scoped>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 150px 0px;
}
.content {
  padding: 100px 100px;
}
.resource {
  text-align: left;
  margin-left: 50px;
}
.info {
  text-align: left;
  margin-left: 50px;
}
</style>
