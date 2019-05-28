
const errCode = require('../err_code.js');
const redis = require('../db/index.js').redis;

module.exports = function () {
    return async function (ctx, next) {
        let cookies = ctx.cookies.get('ebookshare:sess');
        if (!cookies) {
            // 必须先登陆
            throw errCode.COMMON.LOGIN_FIRST
        }
        let user = await redis.get(cookies);
        if (!user) {
            // 必须先登陆
            throw errCode.COMMON.LOGIN_FIRST
        }
        ctx.user = JSON.parse(user);
        return await next();
    }
}