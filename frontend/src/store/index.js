import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import * as actions from './actions'    //actions
import mutations from './mutations'     //mutations
import getters from './getters'         //getters

export default new Vuex.Store({
    state: {
        // 用户信息
        userInfo: {
            account: '',
            nickname: ''
        },
        // 文章列表页数据
        articlePage: {
            articles: [],
            total: 0,
            perPage: 2,
            pageNumber: 1
        },
        // 编辑页面数
        editArticle: {
            id: '',
            title: '',
            url: '',
            content: '',
            labels: ''
        },
        // 我的文章数据
        myArticlePage: {
            articles: [],
            total: 0,
            perPage: 2,
            pageNumber: 1
        },
        // 文章详情页数据
        articleDetailPage: {
            author: {},
            content: '',
            createTime: 0,
            id: '',
            title: '',
            upvoteCount: 0,
            url: '',
            upvoted: false,
            labels: '',
        }
    },
    actions,
    getters,
    mutations,
})


