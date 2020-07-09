const RouletteRepository = module.exports;
const Ioredis = require('ioredis');
const redisConfig = require('../config/redis');

const Redis = new Ioredis(redisConfig);

RouletteRepository.saveRoulette = (data) => Redis.rpush('roulette', JSON.stringify(data));

RouletteRepository.getRoulette   = (key) => Redis.lindex('roulette', key);

RouletteRepository.updateRoullete = (key, data) => Redis.lset('roulette', key, JSON.stringify(data));

RouletteRepository.getAllRoulette = () => Redis.lrange('roulette', 0, -1);
