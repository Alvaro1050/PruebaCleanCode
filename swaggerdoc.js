const SwaggerConfig = require('./app/config/SwaggerConfig');

module.exports = {
  ...SwaggerConfig.option.swaggerDefinition,
  apis: SwaggerConfig.option.apis,
};
