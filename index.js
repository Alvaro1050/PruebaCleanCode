const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const { ErrorHandler } = require('./app/utils/ErrorHandlerMiddleware');
const { PREFIX } = require('./app/config/AppConfig');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  console.error(reason.stack);
});

app.use(PREFIX, routes);
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log('Attend by port:', PORT);
});

module.exports = app;
