
const Router = require('koa-router');
const artlcleHandler = require('../control/article.js');
const userHandler = require('../control/user.js');
const session = require('../middle/session.js');

// 设置路由前缀
var router = new Router({
    prefix: '/ebookshare'
});


// 创建用户
router.post('/user', userHandler.createUser);

// 获取用户信息
router.get('/user', session(), userHandler.getUserInfo);

// 登陆
router.post('/login', userHandler.login);

// 注销
router.post('/logout', userHandler.logout);

// 点赞文章
router.post('/upvote/:articleId', session(), artlcleHandler.upvote);

// 取消点赞文章
router.post('/unupvote/:articleId', session(), artlcleHandler.unupvote);

// 获取文章列表
router.get('/articles', artlcleHandler.listArticles);

// 写文章
router.post('/articles', session(), artlcleHandler.addArticle);

// 更新文章
router.put('/articles/:articleId', session(), artlcleHandler.updateArticle);

// 删除文章
router.delete('/articles/:articleId', session(), artlcleHandler.deleteArticles);

module.exports = router;