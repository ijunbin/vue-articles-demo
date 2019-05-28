
const config = require('./config.js');
const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router/index.js');
const request = require('./middle/request.js');

const app = new Koa();

// 使用ctx.body解析中间件
app.use(bodyParser());


// 初始化路由中间件
app.use(cors({
    credentials: true,
    origin: function (ctx) {
        return 'http://localhost:8080';
    },
}));
// 请求中间件
app.use(request())
app.use(router.routes()).use(router.allowedMethods());


// 监听端口
app.listen(config.port, function () {
    console.log(`server start on 127.0.0.1:${config.port}`)
});