


// 封装请求的返回值
module.exports = function () {

    return async function (ctx, next) {
        try {
            let res = await next();
            ctx.body = {
                code: 200,
                data: res || {},
                msg: ''
            }
        } catch (ex) {
            // 自定义异常
            if (ex.code >= 1000) {
                ctx.body = {
                    code: ex.code,
                    data: {},
                    msg: ex.msg
                }
            } else {
                // 未知异常
                console.log(ex.stack);
                ctx.body = {
                    code: 500,
                    data: {},
                    msg: '服务器异常'
                }
            }
        }
    }
}
