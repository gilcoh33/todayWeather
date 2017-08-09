'use strict';
let pjson = require('../../package.json');
const bunyan = require('bunyan');
let logLevel = 'debug';


module.exports = bunyan.createLogger({
  name: `today-weather-${pjson.name}`,
  serializers: bunyan.stdSerializers,
  src: true,
  streams: [
    {
      stream: process.stdout,
      level: logLevel
    }
  ]
});