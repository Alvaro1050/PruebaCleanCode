const UsersService = module.exports;
const UsersRepository = require('../repositories/UsersRepository');
const log4j = require('../utils/logger');
const bcrypt = require('bcrypt');
const { CustomError } = require('../utils/ErrorHandlerMiddleware');

const defaultLogger = log4j.getLogger('UsersService');

UsersService.create = async (user, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`UsersService.create with ${JSON.stringify(user)}`);

  // password encrypt
  Object.assign(user, { password: bcrypt.hashSync(user.password, 10) });

  return UsersRepository.create(user);
};

UsersService.findUserById = async (userId, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`UsersService.findUserById with ${JSON.stringify({ userId })}`);

  const user = await UsersRepository.findUserById(userId);
  if (!user) {
    throw new CustomError(404, 'The user you are trying to search is not registered in the system', 404);
  }

  return user;
};

UsersService.findUserByEmail = async (email, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`UsersService.findUserById with ${JSON.stringify({ email })}`);

  const user = await UsersRepository.findUserByEmail(email);
  if (!user) {
    throw new CustomError(404, 'The user you are trying to search is not registered in the system', 404);
  }

  return user;
};
