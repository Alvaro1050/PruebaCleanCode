const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const { ErrorHandler } = require('./app/utils/ErrorHandlerMiddleware');
const log4js = require('log4js');
const db = require('./app/utils/DB');
const { PREFIX } = require('./app/config/AppConfig');
const ProducersRunner = require('./app/messaging/ProducersRunner');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());

const logger = log4js.getLogger('devices-ms');
process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  logger.error(reason.stack);
});

app.use(PREFIX, routes);
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log('Escuchando puerto:', PORT);
  db.migrate.latest();
});

ProducersRunner.run();

module.exports = app;
