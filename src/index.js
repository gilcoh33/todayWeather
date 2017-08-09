'use strict';

const pjson = require('../package.json')
  , koa        = require('koa')
  , bodyParser = require('koa-body-parser')
  , router = require('koa-router')()
  , app = new koa()
  , cors = require('koa-cors')
  , mount = require('koa-mount')
  , logger = require('./utils/logger');

// app configuration
app.name = pjson.name;

//Mini apps
// const sanity = require('./lib/sanity');

// Response Handlers
app.use(cors({credentials: true}));
app.use(bodyParser());
app.use(router.allowedMethods());
app.use(router.routes());

// Mount child apps


//Health Route
async function health(ctx, next) {
  ctx.body = {
    msg:'service is up and running'
  };
  ctx.status = 200;
}

router.get('/health', health);
logger.debug('Starting application');
app.listen(8000);