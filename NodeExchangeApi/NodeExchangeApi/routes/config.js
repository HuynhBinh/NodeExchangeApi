"use strict";
var config = {};

config.twitter = {};
config.redis = {};
config.web = {};

config.connectionString = {
    user: 'sa',
    password: 'sa@1234',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance 
    database: 'StackExchange'
};

module.exports = config;