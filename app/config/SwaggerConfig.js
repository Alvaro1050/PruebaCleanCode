const ModelsLibrary = require('../model/ModelsLibrary');
const { version, title, description } = require('../../package.json');
const { PREFIX } = require('../config/AppConfig');

const SwaggerConfig = module.exports;

SwaggerConfig.uiOptions = {
  explorer: false,
  swaggerOptions: {
    docExpansion: 'none',
    validatorUrl: null,
  },
};

SwaggerConfig.option = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version, title, description,
    },
    tags: [{
      name: 'Devices',
      description: 'devices config and managment',
    }, {
      name: 'Channels',
      description: 'Sensors or actuators of a device',
    }, {
      name: 'Measures',
      description: 'reported value from device',
    },
    ],
    servers: [
      {
        url: PREFIX,
      },
    ],
    components: {
      schemas: ModelsLibrary,
    },
  },
  apis: ['app/controllers/*'],
};
