const express = require('express');
const UsersController = require('./controllers/UsersController');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerConfig = require('./config/SwaggerConfig');

const swaggerSpec = swaggerJsdoc(SwaggerConfig.option);
const router = express.Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec));

router.post('/users/:applicationUserId(\\d+)', UsersController.save);

module.exports = router;
