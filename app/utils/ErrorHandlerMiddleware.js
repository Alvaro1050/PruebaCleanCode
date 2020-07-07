
function ErrorHandler(err, req, res, next) {
  const logName = 'ErrorHandlerMiddleware.MainHandler';
  const logger = req.log || console;

  if (logger.error) {
    logger.error(logName, `Error with message ${err.message} and stack: ${err.stack}`);
  } else {
    logger(logName, `Error with message ${err.message} and stack: ${err.stack}`);
  }

  const { status = 500, message = 'Error', code = 500 } = err;

  res.status(status).send({ error: { message, code } });

  return next();
}

class CustomError extends Error {
  constructor(status = 500, message, code = 500) {
    super();
    this.status = status;
    this.message = message;
    this.code = code;
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Not found', code = 404) {
    super(404, message, code);
  }
}

class BadRequestError extends CustomError {
  constructor(message = 'Bad request', code = 400) {
    super(400, message, code);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = 'Not authorized', code = 403) {
    super(403, message, code);
  }
}

module.exports = {
  ErrorHandler,
  CustomError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
};
