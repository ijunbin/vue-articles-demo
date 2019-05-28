<template>
  <div class="vertical-center-modal">
    <Card style="width:500px">
      <div style="text-align:center">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
          <FormItem label="标题" prop="title">
            <Input type="text" v-model="formCustom.title" placeholder="文章标题"></Input>
          </FormItem>
          <FormItem label="标签" prop="labels">
            <Input type="text" v-model="formCustom.labels" placeholder="文章标签"></Input>
          </FormItem>
          <FormItem label="资源链接" prop="url">
            <Input type="url" v-model="formCustom.url" placeholder="资源链接"></Input>
          </FormItem>
          <FormItem label="内容简介" prop="content">
            <Input
              v-model="formCustom.content"
              type="textarea"
              placeholder="请输入文章内容"
              :autosize="{minRows: 10,maxRows: 20}"
            ></Input>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              @click="handleSubmit('formCustom')"
              v-if="!formCustom.isupdate"
            >发表文章</Button>
            <Button type="primary" @click="update('formCustom')" v-if="formCustom.isupdate">更新文章</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      formCustom: {
        id: "",
        title: "",
        url: "",
        content: "",
        labels: "",
        isupdate: false
      },
      ruleCustom: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        label: [{ required: true, message: "标签不能为空", trigger: "blur" }],
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (!valid) {
          //校验失败，退出
          return;
        }
        // 发起发表文章请求
        let res = await this.$store.dispatch("writeArticle", {
          ...this.formCustom
        });
        if (res) {
          this.$Message.error(res);
        } else {
          this.$Message.success("发表成功");
          // 跳转到首页
          this.$router.push("/");
        }
      });
    },
    update(name) {
      this.$refs[name].validate(async valid => {
        if (!valid) {
          //校验失败，退出
          return;
        }
        // 发起发表文章请求
        let res = await this.$store.dispatch("updateArticle", {
          ...this.formCustom
        });
        if (res) {
          this.$Message.error(res);
        } else {
          this.$Message.success("更新成功");
          // 跳转到我的页面
          this.$router.push("/my-article");
        }
      });
    }
  },
  computed: {},
  mounted() {
    let editArticle = this.$store.state.editArticle;
    this.formCustom.id = editArticle.id;
    this.formCustom.title = editArticle.title;
    this.formCustom.url = editArticle.url;
    this.formCustom.content = editArticle.content;
    if (editArticle.labels) {
      this.formCustom.labels = editArticle.labels.toString();
    }
    this.formCustom.isupdate = !!editArticle.title;
  }
};
</script>

<style scoped>
.vertical-center-modal {
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

