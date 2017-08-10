const router = require('koa-router')(),
  controller = require('./controller'),
  koa = require('koa'),
  bodyParser = require('koa-body-parser'),
  app = module.exports = new koa();

app.use(bodyParser());
app.use(router.allowedMethods());
app.use(router.routes());

router.get('/location/:city', controller.getWeather);

module.exports = app;