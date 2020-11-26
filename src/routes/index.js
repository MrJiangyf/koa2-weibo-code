const router = require('koa-router')()
const {set, get} = require("../db/redis");
router.get('/', async (ctx, next) => {
  debugger
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  debugger
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  let viewNum = await get("viewNum");
  let num = viewNum ? viewNum : 0;
  num = num + 1;
  set('viewNum', num);

  ctx.body = {
    title: 'koa2 json',
    viewNum: num
  }
})

module.exports = router
