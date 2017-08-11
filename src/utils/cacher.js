const CONFIG = require('../config').REDIS,
  redis = require('redis');


async function getKey(city){
  try {
    let client = redis.createClient(CONFIG.port, CONFIG.host);
    await client.get(city, function(err, reply){
      return reply
    });
  } catch (err){
    logger.error(`Got Error while getting a key: ${err}`)
  }
}

async function setKey(city, temp) {
  try {
    let client = redis.createClient(CONFIG.port, CONFIG.host);
    await client.set(city, temp, function(err,reply){
      return reply
    });
  } catch (err) {
    logger.error(`Got Error while setting a key: ${err}`)
  }
}

async function existsKey(city) {
  try {
    let client = redis.createClient(CONFIG.port, CONFIG.host);
    await client.exists(city, function(err,reply){
      return reply
    });
  } catch (err) {
    logger.error(`Got Error while checking if a key exists: ${err}`)
  }
}

module.exports = {
  getKey:getKey,
  setKey:setKey,
  existsKey:existsKey
};