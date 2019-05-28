<template>
  <div id="app">
    <div>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <MenuItem name="articles" to="/">
          <Icon type="ios-paper"/>电子书分享
        </MenuItem>
        <MenuItem name="login" to="/login" v-if="!isLogin">
          <Icon type="ios-contact"/>登陆
        </MenuItem>
        <MenuItem name="register" to="/register" v-if="!isLogin">
          <Icon type="md-person-add"/>注册
        </MenuItem>
        <MenuItem name="myArticle" to="/my-article" v-if="isLogin">
          <Icon type="md-albums" />我的分享
        </MenuItem>
        <MenuItem name="writeArticle" to="/" @click.native="logout" v-if="isLogin">
          <Icon type="md-power"/>注销
        </MenuItem>
      </Menu>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as types from "./store/mutation-types.js";
function getCookie(name) {
  //获取指定名称的cookie值
  // (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) {
    return unescape(arr[2]);
  }
  return null;
}
export default {
  name: "App",
  data: function() {
    return {};
  },
  methods: {
    logout() {
      // 清除cookie
      document.cookie =
        "ebookshare:sess=0;expires=" + new Date(0).toUTCString();
      this.$store.commit(types.LOGOUT);
    }
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f8f8f9");
  },
  computed: mapState({
    isLogin: state => !!state.userInfo.nickname
  }),
  async mounted() {
    let sessionId = getCookie("ebookshare:sess");
    if (sessionId) {
      // 获取用户信息
      console.log("sessionId:", sessionId);
      await this.$store.dispatch("userinfo");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
