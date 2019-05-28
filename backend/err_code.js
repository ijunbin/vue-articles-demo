

module.exports = {

    COMMON: {
        PARAM_ERROR: {
            code: 1000,
            msg: '参数异常'
        },
        LOGIN_FIRST: {
            code: 1001,
            msg: '请先登陆'
        }
    },
    USER: {
        USERNAME_EXIST: {
            code: 2000,
            msg: '用户名已存在'
        },
        ACCOUNT_ERROR: {
            code: 2001,
            msg: '账号或密码有误'
        }
    },
    ARTICLE: {
        ARTICLE_NOT_EXIST: {
            code: 3001,
            msg: '文章不存在'
        }
    }
}