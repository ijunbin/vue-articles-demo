
const articleModel = require('../model/article.js');
const userModel = require('../model/user.js');
const articleUpvoteModel = require('../model/articleUpvote.js');
const errCode = require('../err_code.js');
const redis = require('../db/index.js').redis;
const _ = require('underscore');

/**
 * @description 校验文章    
 * @param {*} articleId 
 */
async function checkArticle(articleId) {
    let article = await articleModel.findOne(articleId);
    if (!article) {
        // 文章不存在
        throw errCode.ARTICLE.ARTICLE_NOT_EXIST;
    }
}

/**
 * @description 获取用户信息
 * @param {*} ctx 
 */
async function getUserInfo(ctx) {
    let cookies = ctx.cookies.get('ebookshare:sess');
    if (cookies) {
        let user = await redis.get(cookies);
        if (user) {
            ctx.user = JSON.parse(user);
        }
    }
}

module.exports = {

    /**
     * @description 获取文章列表
     * @param {*} perPage 
     * @param {*} pageNumber 
     */
    listArticles: async function (ctx, next) {

        // 获取分页参数
        let res = { list: [], total: 0 }
        let { perPage = 20, pageNumber = 1, user = '', label = '' } = ctx.query;
        let limit = +perPage;
        let skip = (+pageNumber - 1) * limit;
        // 请求文章列表
        let userId = ''
        if (user) {
            let userInfo = await userModel.findUser({ 'username': user });
            userId = userInfo && userInfo.id || '';
        }
        let [list, total] = await Promise.all([
            articleModel.findAll(skip, limit, userId, label),
            articleModel.count(userId, label),
        ])
        let authors = _.map(list, 'author');
        // 获取用户列表
        let userInfo = await userModel.findByIds(authors);
        let userMap = _.indexBy(userInfo, 'id');
        let articleIds = [];
        list.forEach(item => {
            articleIds.push(item._id)
        })
        // 获取文章点赞数
        let upvoteCount = await articleUpvoteModel.getUpvoteCount(articleIds);
        let upvoteCountMap = _.indexBy(upvoteCount, '_id');

        // 获取当前用户已经点赞的文章
        let userUpvoteMap = {};
        await getUserInfo(ctx);
        if (ctx.user) {
            let info = await articleUpvoteModel.getUserUpvote(articleIds, ctx.user.id);
            userUpvoteMap = _.indexBy(info, 'articleId');
        }

        list.forEach(article => {
            let item = {};
            item.id = article.id;
            item = _.pick(article, 'id', 'createTime', 'url', 'content', 'title', 'labels');
            item.labels = item.labels || [];
            let upvoteInfo = upvoteCountMap[article.id];
            item.upvoteCount = upvoteInfo && upvoteInfo.count || 0;
            item.upvoted = !!userUpvoteMap[article.id] || false;
            let user = userMap[article.author.toString()];
            if (user) {
                item.author = {
                    nickname: user.nickname,
                    account: user.username
                };
            }
            res.list.push(item);
        })
        res.total = total;
        return res;
    },

    /**
     * @description 删除文章
     * @param {*} perPage 
     * @param {*} pageNumber 
     */
    deleteArticles: async function (ctx, next) {
        let { articleId = '' } = ctx.params;
        if (articleId) {
            await articleModel.delete(articleId)
        }
    },

    /**
     * @description 更新文章
     * @param {*} ctx 
     * @param {*} next 
     */
    updateArticle: async function (ctx, next) {
        let { articleId } = ctx.params;
        let { title = '', content = '', url = '', labels = '' } = ctx.request.body;
        if (articleId && title && content) {
            labels = labels.split(',');
            await articleModel.update(articleId, title, content, url, labels);
        }
    },

    /**
     * @description 点赞文章
     * @param {*} ctx 
     * @param {*} next 
     */
    upvote: async function (ctx, next) {
        let { articleId } = ctx.params;
        await checkArticle(articleId);
        // 获取点赞记录
        let doc = await articleUpvoteModel.findOne(articleId, ctx.user.id);
        if (!doc) {
            // 插入记录
            await articleUpvoteModel.insert(articleId, ctx.user.id);
        }
    },

    /**
     * @description 取消点赞
     * @param {*} ctx 
     * @param {*} next 
     */
    unupvote: async function (ctx, next) {
        let { articleId } = ctx.params;
        await checkArticle(articleId);
        // 获取点赞记录
        let doc = await articleUpvoteModel.findOne(articleId, ctx.user.id);
        if (doc) {
            // 删除记录
            await articleUpvoteModel.delete(doc.id);
        }
    },

    /**
     * @description 添加文章
     * @param {*} ctx 
     * @param {*} next 
     */
    addArticle: async function (ctx, next) {
        let { title = '', content = '', url = '', labels = '' } = ctx.request.body;
        if (!title || !content) {
            throw errCode.COMMON.PARAM_ERROR;
        }
        labels = labels.split(',');
        await articleModel.insert(ctx.user.id, title, content, url, labels);
    }

}