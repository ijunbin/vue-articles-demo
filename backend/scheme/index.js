const mongoose = require('../db/index.js').mongo;
const Schema = mongoose.Schema;


// 用户模型
const UserSchema = new Schema({
    username: { type: String }, // 用户名
    nickname: { type: String }, //昵称
    password: { type: String }, // 用户密码
    email: { type: String }, //email
    hobby: { type: String }, // 爱好
    sex: { type: Number }, //性别
})

// 用户模型
const ArticleSchema = new Schema({
    author: { type: Schema.Types.ObjectId }, // 作者
    createTime: { type: Number }, //发布时间
    updateTime: { type: Number }, //更新时间
    content: { type: String }, //内容
    title: { type: String }, //标题
    url: { type: String }, //网盘地址
    labels: [{ type: String }] //标签
})


// 文章点赞用户数
const ArticleUpvoteUsersSchema = new Schema({
    articleId: { type: Schema.Types.ObjectId }, //文章id
    userId: { type: Schema.Types.ObjectId }, // id
})


module.exports = {
    User: mongoose.model('User', UserSchema),
    Article: mongoose.model('Article', ArticleSchema),
    ArticleUpvoteUsers: mongoose.model('ArticleUpvoteUsers', ArticleUpvoteUsersSchema),
}