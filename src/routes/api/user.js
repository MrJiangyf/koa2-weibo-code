/**
 * @description user 注册路由
 */
const router = require('koa-router')();
router.prefix("/api/user");

const {isExist, register, login, deleteCurUser} = require("../../controller/user");

//利用：json shema 对注册的信息进行校验
const {genValidator} = require("../../middlewares/validator");
const userValidate = require("../../validator/user");

const {isTest} = require("../../utils/env");

/**
 * 用户名是否存在
 */
router.post("/isExist", async (ctx, next) => {
    const {userName} = ctx.request.body

    const result = await isExist(userName);
    ctx.body = result;
});

/**
 * 注册
 */
router.post("/register", genValidator(userValidate) ,async (ctx, next) => {
    const {userName, gender, password} = ctx.request.body;
    const result = await register({userName, gender, password});
    ctx.body = result;
});

/**
 * 登陆
 */
router.post("/login", async (ctx, next) => {
    const {userName, password} = ctx.request.body;
    const result = await login(ctx, userName, password);
    ctx.body = result;
});

/**
 * 删除用户
 */
router.post("/delete", async (ctx, next) => {
    //只有在test模式下才能删除当前用户信息
    debugger
    if(isTest) {
        const {userName} = ctx.session.userInfo;
        ctx.body = await deleteCurUser(userName);
    }
})

module.exports = router;
