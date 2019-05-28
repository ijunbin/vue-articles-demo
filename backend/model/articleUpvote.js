const { ArticleUpvoteUsers } = require('../scheme/index.js');
const mongoose = require('../db/index.js').mongo;

module.exports = {


    // 获取
    findOne: async function (articleId, userId) {
        return await ArticleUpvoteUsers.findOne({
            'articleId': mongoose.Types.ObjectId(articleId),
            'userId': mongoose.Types.ObjectId(userId),
        });
    },

    // 插入
    insert: async function (articleId, userId) {
        await ArticleUpvoteUsers.create({
            articleId: mongoose.Types.ObjectId(articleId),
            userId: mongoose.Types.ObjectId(userId)
        })
    },

    // 删除
    delete: async function (id) {
        await ArticleUpvoteUsers.deleteOne({
            '_id': mongoose.Types.ObjectId(id)
        })
    },

    //获取文章点赞人数
    getUpvoteCount: async function (ids) {
        return await ArticleUpvoteUsers.aggregate([
            {
                $match: {
                    articleId: { $in: ids }
                }
            },
            {
                $group: {
                    _id: '$articleId',
                    count: { $sum: 1 }
                }
            }
        ])
    },

    // 获取用户对文章点赞情况
    getUserUpvote: async function (ids, userId) {
        return await ArticleUpvoteUsers.find({ $and: [{ 'articleId': { $in: ids } }, { 'userId': { $eq: mongoose.Types.ObjectId(userId) } }] });
    }
}