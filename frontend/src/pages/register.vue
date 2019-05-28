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
          <FormItem prop="nickname">
            <Input type="text" v-model="formCustom.nickname" placeholder="昵称">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="hobby">
            <Input type="text" v-model="formCustom.hobby" placeholder="爱好类型">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="email">
            <Input type="email" v-model="formCustom.email" placeholder="邮箱">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <div style="margin:10px 0px">
            <span style="margin:0px 20px">性别:</span>
            <RadioGroup v-model="formCustom.sex">
              <Radio :label="1">男</Radio>
              <Radio :lbel="2">女</Radio>
            </RadioGroup>
          </div>
          <FormItem prop="password">
            <Input type="password" v-model="formCustom.password" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck" placeholder="重复密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">注册</Button>
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
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.formCustom.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    return {
      formCustom: {
        user: "",
        password: "",
        passwdCheck: "",
        nickname: "",
        email: "",
        hobby: "",
        sex: 1
      },
      ruleCustom: {
        user: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }]
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
        let res = await this.$store.dispatch("register", {
          ...this.formCustom
        });
        if (res) {
          this.$Message.error(res);
        } else {
          this.$Message.success("注册成功");
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