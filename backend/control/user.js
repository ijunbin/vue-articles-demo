
const redis = require('../db/index.js').redis;
const userModel = require('../model/user.js');
const errCode = require('../err_code.js');
const uuidv4 = require('uuid/v4');

module.exports = {

    /**
     * @description 创建用户
     * @param {*} ctx 
     * @param {*} next 
     */
    createUser: async function (ctx, next) {
        let { username = '', nickname = '', password = '', hobby = '', sex = 1, email = '' } = ctx.request.body;
        // 判断参数
        if (!username || !nickname || !password) {
            throw errCode.COMMON.PARAM_ERROR;
        }
        // 查看该用户名是否被注册
        let user = await userModel.findUser({ username });
        if (user) {
            throw errCode.USER.USERNAME_EXIST;
        }
        // 创建用户
        await userModel.createUser(username, nickname, password, hobby, sex, email);
    },

    /**
     * @description 获取用户信息
     * @param {*} ctx 
     * @param {*} next 
     */
    getUserInfo: async function (ctx, next) {
        // 返回用户信息
        return ctx.user;
    },

    /**
     * @description 登陆
     * @param {*} ctx 
     * @param {*} next 
     */
    login: async function (ctx, next) {
        let { username = '', password = '' } = ctx.request.body;
        // 判断参数
        if (!username || !password) {
            throw errCode.COMMON.PARAM_ERROR;
        }
        // 查找用户
        let user = await userModel.findUser({ username, password });
        if (!user) {
            throw errCode.USER.ACCOUNT_ERROR;
        }
        // 获取uuid
        let uuid = uuidv4();
        let userInfo = {
            id: user._id,
            username: user.username,
            nickname: user.nickname,
            hobby: user.hobby,
            email: user.email,
            sex: user.sex
        }
        // 设置cookies
        ctx.cookies.set('ebookshare:sess', uuid, {
            domain: 'localhost',  // 写cookie所在的域名
            path: '/',
            maxAge: 60 * 60 * 1000,        // cookie有效时长  60分钟
            httpOnly: false,  // 是否只用于http请求中获取 (设置为false,浏览器才能通过 document.cookie去获取)
            overwrite: true  // 是否允许重写
        })
        // 设置session
        await redis.set(uuid, JSON.stringify(userInfo), 'EX', 30 * 60);
        return {
            username: user.username,
            nickname: user.nickname,
            hobby: user.hobby,
            sex: user.sex,
            email: user.email,
        }
    },

    /**
     * @description 登出
     * @param {*} ctx 
     * @param {*} next 
     */
    logout: async function (ctx, next) {
        // 清除cookies
        ctx.cookies.set('ebookshare:sess', '', { maxAge: 0 });
    }
}