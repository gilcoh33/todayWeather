const axios = require('axios'),
  API = require('../../config').API,
  logger = require('../../utils/logger'),
  cacher = require('../../utils/cacher'),
  _ = require('lodash');


async function getWeather(ctx, next) {
  let location = ctx.params.city;
  try {
    let cacheClient = await cacher.getClient();
    let key = await cacheClient.getAsync(location);
    if (!key) {
      logger.debug(`${location} not in db - getting information form meta-weather`);
      let res = await axios.get(API.weatherApi + API.getLocationID + location);
      let obj = _.filter(res.data, (city) => {
        return city.title.toLowerCase() === location.toLowerCase()
      });
      if (obj.length) {
        logger.debug(`City found: ${obj[0].title}`);
        let res = await axios.get(API.weatherApi + API.getWeather + obj[0].woeid);
        let city = obj[0].title;
        let temp = res.data.consolidated_weather[0].the_temp.toFixed();
        ctx.body = {
          city: location,
          temp: temp
        };
        ctx.status = 200;
        await cacheClient.setAsync(location, temp)
      } else {
        logger.debug(`No city found`);
        ctx.body = {
          msg: "City was not found"
        };
        ctx.status = 400
      }
    } else {
      logger.debug(`${location} found in db - returning value: ${key}`);
      ctx.body = {
        city: location,
        temp: key
      };
    }
  } catch (err) {
    logger.error(err)
  }
}

module.exports = {
  getWeather: getWeather
};