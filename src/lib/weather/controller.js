const axios = require('axios'),
  API = require('../../config').API,
  logger = require('../../utils/logger'),
  cacher = require('../../utils/cacher'),
  _ = require('lodash');

async function getWeather(ctx, next) {
  let location = ctx.params.city;
  try {
    let res = await axios.get(API.weatherApi + API.getLocationID + location);
    let obj = _.filter(res.data, (city) => {
      return city.title.toLowerCase() === location.toLowerCase()
    });
    if(obj.length){
      logger.debug(`City found: ${obj[0].title}`);
      let res = await axios.get(API.weatherApi + API.getWeather + obj[0].woeid);
      let city = obj[0].title;
      let temp = res.data.consolidated_weather[0].the_temp.toFixed();
      let date = res.data.consolidated_weather[0].applicable_date;
      ctx.body = {
        city: city,
        id: obj[0].woeid,
        time: date,
        temp: temp
      };
      let keyCheck = await cacher.existsKey(city);
      console.log(keyCheck)
      if(keyCheck === 0){
        logger.debug(`${city} not exist in Redis - Going to set a key`);
        cacher.setKey(city, temp)
      } else {
        logger.debug(`${city} already located in Redis - Getting the key`);
      }
    } else {
      logger.debug(`No city found`);
      ctx.body = {
        msg: "City was not found"
      };
      ctx.status = 400
    }
  } catch (err){
    logger.error(`Got Error ${err}`)
  }
}

module.exports = {
  getWeather: getWeather
};