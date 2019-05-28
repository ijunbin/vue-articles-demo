<template>
  <Card style="width:70%">
    <p slot="title" style="font-size: 20px;">{{title}}</p>
    <div style="text-align: left;">
      <p>作者: {{author.nickname}} &nbsp;&nbsp;&nbsp; 发布时间: {{createTime}}</p>
      <p v-if="labels">标签: {{labels}}</p>
    </div>
    <span class="content">{{content}}</span>
    <div style="text-align: right;">
      <p>点赞人数: {{upvoteCount}}</p>
    </div>
  </Card>
</template>

<script>
import moment from "moment";
export default {
  name: "articleItem",
  props: {
    detail: Object,
    required: true
  },
  data() {
    return {
      title: this.detail.title,
      author: this.detail.author,
      createTime: moment.unix(this.detail.createTime).format("YYYY-MM-DD"),
      content: this.detail.content,
      upvoteCount: this.detail.upvoteCount,
      labels: this.detail.labels.toString()
    };
  },
  methods: {},
  mounted() {}
};
</script>


<style scoped>
div {
  margin: 0 10px 30px 0px;
}
.content {
  display: block;
  margin-bottom: 20px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #482929;
  letter-spacing: 0;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /*规定最多显示两行*/
}
</style>
