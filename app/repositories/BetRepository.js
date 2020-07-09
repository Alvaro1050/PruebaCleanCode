const BetRepository = module.exports;
const Ioredis = require('ioredis');
const redisConfig = require('../config/redis');

const Redis = new Ioredis(redisConfig);

BetRepository.saveBet = (data) => Redis.rpush('bet', JSON.stringify(data));

BetRepository.getAllBet = () => Redis.lrange('bet', 0, -1);

BetRepository.updateBet = (key, data) => Redis.lset('bet', key, JSON.stringify(data));
