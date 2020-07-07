const UsersRepository = module.exports;
const DB = require('../utils/DB');
const RedisClient = require('../utils/RedisClient');

UsersRepository.create = user => DB('application_user').insert(user).returning('*');

UsersRepository.findUserById = async (userId) => {
  const ttlRedis = 60 * 30;
  const cacheValue = await RedisClient.get(userId).catch(error => error);

  if (cacheValue) return cacheValue;

  const user = await DB('application_user').where({ id: userId }).select('*').first();

  if (user) RedisClient.save(userId, user, ttlRedis);

  return user;
};

UsersRepository.findUserByEmail = email =>
  DB('application_user').where({ email }).select('*');
