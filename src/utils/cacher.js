const CONFIG = require('../config').REDIS,
  redis = require('redis');


async function getKey(city){
  let client = redis.createClient(CONFIG.port, CONFIG.host);
  await client.get(city, function(err, reply){
    return reply
  });
}

async function setKey(city, temp) {
  let client = redis.createClient(CONFIG.port, CONFIG.host);
  await client.set(city, temp, function(err,reply){
    return reply
  });
}


module.exports = {
  getKey:getKey,
  setKey:setKey
};