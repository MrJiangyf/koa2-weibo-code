/**
 * @description user 注册路由
 */
const router = require('koa-router')();
router.prefix("/api/user");

const {isExist} = require("../../controller/user");

//注册路由
router.post("/register", async (ctx, next) => {

});

//用户名是否存在
router.post("/isExist", async (ctx, next) => {
    const {userName} = ctx.request.body
    debugger
    const result = await isExist(userName);
    ctx.body = result;
})

module.exports = router;
