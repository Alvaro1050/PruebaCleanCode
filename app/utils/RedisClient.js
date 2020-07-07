const RedisClient = module.exports;
const Ioredis = require('ioredis');
const redisConfig = require('../config/redis');
const log4j = require('../utils/logger');

const defaultLogger = log4j.getLogger('MeasuresService');

const SERVICE_NAME = 'measures-ms';

function getKey(key) {
  return `${SERVICE_NAME}:${key}`;
}

const Redis = new Ioredis(redisConfig);

RedisClient.save = (key, data, ttl = redisConfig.expirationTime, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`Saving with key = ${getKey(key)} on redis ${JSON.stringify(data)}`);

  return Redis.set(getKey(key), JSON.stringify(data), 'EX', ttl);
};

RedisClient.get = (key, options = {}) => {
  const { logger = defaultLogger } = options;

  logger.info(`get from redis ${getKey(key)}`);

  return Redis.get(getKey(key)).then(resp => JSON.parse(resp));
};

RedisClient.delete = (key, options = {}) => {
  const { logger = defaultLogger } = options;

  logger.info(`del from redis ${getKey(key)}`);

  return Redis.del(getKey(key));
};
