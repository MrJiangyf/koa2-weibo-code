/**
 * @description user 注册路由
 */
const router = require('koa-router')();
router.prefix("/api/user");

const {isExist, register} = require("../../controller/user");

//对注册的信息进行校验
const {genValidator} = require("../../middlewares/validator");
const userValidate = require("../../validator/user");

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



module.exports = router;
