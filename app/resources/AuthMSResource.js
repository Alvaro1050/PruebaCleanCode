const AuthMSResource = module.exports;
const HTTPClient = require('../utils/HTTPClient');

const {
  MICROSERVICE_URL,
} = process.env;
const BASE_URL = `${MICROSERVICE_URL}/api/auth-ms`;

AuthMSResource.createTokenForUser = body => HTTPClient.post(`${BASE_URL}/token`, body);
