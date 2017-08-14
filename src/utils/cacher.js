const CONFIG = require('../config').REDIS,
  redis = require('redis'),
  Promise = require('bluebird'),
  logger = require('../utils/logger');


// Promisify RedisClient prototype
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

let CLIENT;

function _newClient(){
  return new Promise(function(resolve, reject){
    try{
      let client = redis.createClient(CONFIG.port, CONFIG.host);
      client.on("ready", function () {
        resolve(client);
      });
      client.on("error", reject);
    }
    catch(err){
      logger.error("Cannot Connect to Redis");
      reject(err);
    }
  })
}


async function getClient(){
  if(!CLIENT || !CLIENT.connected){
    logger.debug('Initializing new redis client');
    let CLIENT = await _newClient();
    return CLIENT
  }
}

module.exports = {
  getClient: getClient
};