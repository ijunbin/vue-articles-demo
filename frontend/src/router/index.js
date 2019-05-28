import Vue from 'vue'
import Router from 'vue-router'
import article from '@/pages/article'
import login from '@/pages/login'
import register from '@/pages/register'
import writeArticle from '@/pages/writeArticle'
import articleDetail from '@/pages/articleDetail'
import myArticle from '@/pages/myArticle'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'article',
      component: article
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/write-article',
      name: 'writeArticle',
      component: writeArticle
    },
    {
      path: '/my-article',
      name: 'myArticle',
      component: myArticle
    },
    {
      path: '/article/:id',
      name: 'articleDetail',
      component: articleDetail
    }
  ]
})
