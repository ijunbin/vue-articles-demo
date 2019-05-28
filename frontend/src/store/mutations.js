import * as types from './mutation-types.js'


//mutation
export default {

    // 获取文章列表
    [types.GET_ARTICLES](state, playload) {
        if (playload) {
            state.articlePage.articles = Object.assign(playload.articles);
            state.articlePage.total = playload.total;
        }
    },

    // 获取我的文章列表
    [types.GET_MY_ARTICLES](state, playload) {
        if (playload) {
            state.myArticlePage.articles = Object.assign(playload.articles);
            state.myArticlePage.total = playload.total;
        }
    },

    // 登陆
    [types.LOGIN](state, playload) {
        if (playload) {
            state.userInfo = Object.assign(playload);
        }
    },

    // 登出
    [types.LOGOUT](state, ) {
        state.userInfo = {
            account: '',
            nickname: ''
        }
    },

    // 写文章
    [types.WRITE_ARTICLE](state, playload) {

    },

    // 编辑文章
    [types.EDIT_ARTICLE](state, playload) {
        if (playload) {
            state.editArticle = Object.assign(playload);
        }
    },

    // 校验登陆
    [types.CHECK_LOGIN](state, playload) {
        if (playload) {
            state.userInfo = Object.assign(playload);
        }
    },

    // 显示文章详情
    [types.SHOW_DETAIL](state, playload) {
        if (playload) {
            state.articleDetailPage = Object.assign(playload);
        }
    },

    // 点赞
    [types.UPVOTE_SUCCESS](state, playload) {
        state.articleDetailPage.upvoteCount++;
        state.articleDetailPage.upvoted = !state.articleDetailPage.upvoted
    },

    // 取消点赞
    [types.UN_UPVOTE_SUCCESS](state, playload) {
        state.articleDetailPage.upvoteCount--;
        state.articleDetailPage.upvoted = !state.articleDetailPage.upvoted
    },

    // 清除编辑数据
    [types.CLEAR_EDIT](state) {
        state.editArticle = {};
    },
}
