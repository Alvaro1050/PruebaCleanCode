const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_CACHE_TIME,
  REDIS_PASS,
} = process.env;

module.exports = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASS,
  expirationTime: REDIS_CACHE_TIME || 1800,
};
