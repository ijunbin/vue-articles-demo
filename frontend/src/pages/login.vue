<template>
  <div class="vertical-center-modal">
    <Card style="width:320px">
      <div style="text-align:center">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="20">
          <FormItem prop="user">
            <Input type="text" v-model="formCustom.user" placeholder="用户名">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formCustom.password" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">登陆</Button>
            <Button @click="handleReset('formCustom')">重置</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formCustom: {
        user: "",
        password: ""
      },
      ruleCustom: {
        user: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
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
        // 发起登陆请求
        let res = await this.$store.dispatch("login", { ...this.formCustom });
        if (res) {
          this.$Message.error(res);
        } else {
          this.$Message.success("登陆成功");
          // 跳转到首页
          this.$router.push("/");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
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

