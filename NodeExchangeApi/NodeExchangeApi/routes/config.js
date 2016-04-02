"use strict";
var Result = require('../model/Result.js');
var config = {};

config.twitter = {};
config.redis = {};
config.web = {};

config.connectionString = {
    user: 'Binh',
    password: 'bb@1234',
    server: '203.113.143.247', // You can use 'localhost\\instance' to connect to named instance 
    database: 'StackExchange'
};

config.ok = 'ok';
config.fail = 'fail';
config.unknownError = 'unknown error';
config.emptyData = '';
config.empty = 'empty data';


config.responseWithError = function (res, err)
{
    var result = new Result(config.fail, err, config.emptyData);
    res.json(result);
};

config.responseWithData = function (res, data)
{
    var result = new Result(config.ok, config.emptyData, data);
    res.json(result);
};


module.exports = config;