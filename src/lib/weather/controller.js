const axios = require('axios'),
  API = require('../../config').API,
  _ = require('lodash');

async function getWeather(ctx, next) {
  let location = ctx.params.city;
  try {
    let res = await axios.get(API.weatherApi + API.getLocationID + location);
    let obj = _.filter(res.data, (city) => {
      return city.title.toLowerCase() === location.toLowerCase()
    });
    if(obj.length){
      let res = await axios.get(API.weatherApi + API.getWeather + obj[0].woeid);
      let temp = res.data.consolidated_weather[0].the_temp.toFixed();
      let date = res.data.consolidated_weather[0].applicable_date;
      ctx.body = {
        city: obj[0].title,
        id: obj[0].woeid,
        time: date,
        temp: temp
      }
    } else {
      ctx.body = {
        msg: "City was not found"
      };
      ctx.status = 400
    }
  } catch (err){
    console.log(err)
  }
}


module.exports = {
  getWeather: getWeather
};