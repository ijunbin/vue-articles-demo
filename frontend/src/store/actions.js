import * as types from './mutation-types.js'
import axios from 'axios'

// http请求带上cookies
axios.defaults.withCredentials = true;

let host = 'http://localhost:3000'

// 获取文章列表
export const listArticle = async ({ commit, state }, payload = {}) => {
    let res = await axios.get(`${host}/ebookshare/articles`, {
        params: {
            perPage: state.articlePage.perPage,
            pageNumber: payload.page || state.articlePage.pageNumber,
            label: payload.labels || ''
        }
    });
    let rep = res.data;
    let articles = [], total = 0;
    if (rep.code == 200) {
        articles = rep.data.list;
        total = rep.data.total;
    }
    commit(types.GET_ARTICLES, { articles, total });
}

// 获取我的文章列表
export const listMyArticle = async ({ commit, state }, payload = {}) => {
    let res = await axios.get(`${host}/ebookshare/articles`, {
        params: {
            user: state.userInfo.account,
            perPage: state.myArticlePage.perPage,
            pageNumber: payload.page || state.myArticlePage.pageNumber
        }
    });
    let rep = res.data;
    let articles = [], total = 0;
    if (rep.code == 200) {
        articles = rep.data.list;
        total = rep.data.total;
    }
    commit(types.GET_MY_ARTICLES, { articles, total });
}

// 写文章
export const writeArticle = async ({ commit, state }, playload) => {
    let res = await axios.post(`${host}/ebookshare/articles`, {
        title: playload.title,
        url: playload.url,
        content: playload.content,
        labels: playload.labels
    });
    let rep = res.data;
    if (rep.code == 200) {
        return '';
    } else {
        return rep.msg
    }
}

// 删除文章
export const delarticle = async ({ commit, state }, id) => {
    let res = await axios.delete(`${host}/ebookshare/articles/${id}`);
    let rep = res.data;
    if (rep.code == 200) {
        return '';
    } else {
        return rep.msg
    }
}

// 更新文章
export const updateArticle = async ({ commit, state }, playload) => {
    let res = await axios.put(`${host}/ebookshare/articles/${playload.id}`, {
        title: playload.title,
        url: playload.url,
        content: playload.content,
        labels: playload.labels
    });
    let rep = res.data;
    if (rep.code == 200) {
        return '';
    } else {
        return rep.msg
    }
}

// 获取用户信息
export const userinfo = async ({ commit, state }) => {
    let res = await axios.get(`${host}/ebookshare/user`);
    let rep = res.data;
    if (rep.code == 200) {
        commit(types.CHECK_LOGIN, {
            account: rep.data.username,
            nickname: rep.data.nickname,
            email: rep.data.email,
            sex: rep.data.sex,
            hobby: rep.data.hobby,
        });
        return '';
    } else {
        return rep.msg
    }
}

// 登陆
export const login = async ({ commit, state }, payload) => {

    let res = await axios.post(`${host}/ebookshare/login`, {
        username: payload.user,
        password: payload.password
    });
    let rep = res.data;
    if (rep.code == 200) {
        commit(types.LOGIN, { account: rep.data.username, nickname: rep.data.nickname, hobby: rep.data.nickname, email: rep.data.email, sex: rep.data.sex });
        return '';
    } else {
        return rep.msg
    }
}

// 注册
export const register = async ({ commit, state }, payload) => {

    let res = await axios.post(`${host}/ebookshare/user`, {
        username: payload.user,
        password: payload.password,
        nickname: payload.nickname,
        email: payload.email,
        hobby: payload.hobby,
        sex: payload.sex,
    });
    let rep = res.data;
    if (rep.code == 200) {
        return '';
    } else {
        return rep.msg
    }
}

// 点赞
export const upvote = async ({ commit, state }, id) => {
    console.log(id);
    let res = await axios.post(`${host}/ebookshare/upvote/${id}`);
    let rep = res.data;
    if (rep.code == 200) {
        return '';
    } else {
        return rep.msg
    }
}

// 取消点赞
export const unupvote = async ({ commit, state }, id) => {
    let res = await axios.post(`${host}/ebookshare/unupvote/${id}`);
    let rep = res.data;
    if (rep.code == 200) {
        return '';
    } else {
        return rep.msg
    }
}