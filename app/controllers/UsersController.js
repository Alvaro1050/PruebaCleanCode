const UsersController = module.exports;
const UsersService = require('../services/UsersService');
const log4j = require('../utils/logger');
const LogUtils = require('../utils/LogUtils');
const Validator = require('../utils/Validator');
const UsersCreateSchema = require('../model/requests/UsersCreateSchema');

/**
 * @swagger
 *
 * /:
 *   post:
 *     tags:
 *      - User
 *     description: Register a application_user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user Info
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/components/schemas/UsersCreateSchema"
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad request. Error in params
 *       '401':
 *         description: Authorization information is missing or invalid.
 *       '404':
 *         description: Entity not found.
 *       '5XX':
 *         description: Unexpected error.
 */
UsersController.save = async (req, res, next) => {
  const logName = 'SaveUser: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  logger.info(`Starts UsersController.save: params ${JSON.stringify(body)}`);

  try {
    Validator(UsersCreateSchema).validateRequest(body);

    return UsersService.create(body, { logger, logName })
      .then(response => res.send(response))
      .catch(error => next(error));
  } catch (error) {
    return next(error);
  }
};

/**
 * @swagger
 *
 *  /users/{userId}:
 *   get:
 *     tags:
 *      - User
 *     description: Get a user by Id
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "userId"
 *         in: "path"
 *         description: "Id of user to find"
 *         required: true
 *         type: "integer"
 *         format: "int64"
 *     responses:
 *       '200':
 *         description: OK and json with data of registers
 *       '400':
 *         description: Bad request. Error in params
 *       '401':
 *         description: Authorization information is missing or invalid.
 *       '404':
 *         description: Entity not found.
 *       '5XX':
 *         description: Unexpected error.
 */
UsersController.getUserById = async (req, res, next) => {
  const logName = 'GetUser: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { params: { userId } } = req;
  logger.info(`Starts UsersController.save id ${userId}`);

  try {
    return await UsersService.findUserById(userId, { logger, logName })
      .then(response => res.send(response))
      .catch(error => next(error));
  } catch (error) {
    logger.error(`[ERROR] : ${error.message}`);

    return next(error);
  }
};

/**
 * @swagger
 *
 *  /users:
 *   get:
 *     tags:
 *      - User
 *     description: Get a user by email
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "email"
 *         in: "query"
 *         description: "email of user to find"
 *         required: true
 *         type: "string"
 *     responses:
 *       '200':
 *         description: OK and json with data of registers
 *       '400':
 *         description: Bad request. Error in params
 *       '401':
 *         description: Authorization information is missing or invalid.
 *       '404':
 *         description: Entity not found.
 *       '5XX':
 *         description: Unexpected error.
 */
UsersController.getUserByEmail = async (req, res, next) => {
  const logName = 'GetUser: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { query: { email } } = req;
  logger.info(`Starts UsersController.getUserByEmail id ${email}`);

  try {
    return await UsersService.findUserByEmail(email, { logger, logName })
      .then(response => res.send(response))
      .catch(error => next(error));
  } catch (error) {
    logger.error(`[ERROR] : ${error.message}`);

    return next(error);
  }
};
