const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const {isProd} = require("./utils/env");

//路由
const errorViewRouter = require('./routes/view/error');
const index = require('./routes/index')
const users = require('./routes/users')
const userViewRouter = require("./routes/view/user");
const userApiRouter = require("./routes/api/user");

//redis
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const {REDIS_CONF} = require("./conf/db")
const {SESSION_SECRET_KEY} = require("./conf/secretKeys")

// error handlere
let onerrorConf = {};
if (isProd) {
    onerrorConf = {
        redirect: "/error"
    }
}
onerror(app, onerrorConf)

// 中间件：日志
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
    // 配置 cookie
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    // 配置 redis
    store: redisStore({
        all: "111.231.145.124:6379"
    })
}));

// 路由相关
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
