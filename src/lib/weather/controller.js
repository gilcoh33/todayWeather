const axios = require('axios'),
  API = require('../../config').API;

async function getLocationId(ctx, next) {
  let location = ctx.params.city;
  try {
    let res = await axios.get(API.weatherApi + API.getLocationID + location);
    if(res.data.length) {
      res.data.forEach(function (obj) {
        if (obj.title.toLowerCase() === location.toLowerCase()) {
          ctx.body = {
            msg: "City found",
            id: obj.woeid
          };
          ctx.status = 200
        } else {
          ctx.body = {
            msg: "City was not found"
          };
          ctx.status = 400
        }
      });
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
  getLocationId: getLocationId
};