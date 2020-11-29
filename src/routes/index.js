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
  debugger
  let viewNum = await get("viewNum");
  let num = viewNum ? viewNum : 1;
  num = num + 1;
  set('viewNum', num);

  ctx.body = {
    title: 'koa2 json',
    viewNum
  }
})

module.exports = router
