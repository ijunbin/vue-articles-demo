const config = require('../config.js');
const mongoose = require("mongoose");
const Redis = require('ioredis');
const redis = new Redis(config.redis);

redis.on('connect', () => {
    console.log('redis connect success...')
})


const url = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbname}`;

// 连接
mongoose.connect(url);

// 连接成功
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + url);
})

// 连接异常
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error ' + err);
})

// 连接断开
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected ');
})



module.exports = {
    mongo: mongoose,
    redis: redis
};