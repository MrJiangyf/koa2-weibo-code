/**
 * @description 首页
 */
const {loginCheck} = require("../../middlewares/loginChecks");
const router = require('koa-router')();
router.prefix("/api/blog");
const {create} = require("../../controller/blog-home");
const {genValidator} = require("../../middlewares/validator");
const blogValidate = require("../../validator/blog");

router.post("/create", loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const {content, image} = ctx.request.body;
    const {id} = ctx.session.userInfo
    const  userId = id;
    ctx.body = await create({userId, content, image});
});

module.exports = router;
