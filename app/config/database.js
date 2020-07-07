const MAX_CONNECTION_POOLSIZE = 5;

const {
  DB_CONNECTION = 'postgres://localhost:5432/Users-ms',
} = process.env;

module.exports = {
  client: 'pg',
  connection: DB_CONNECTION,
  pool: { min: 1, max: MAX_CONNECTION_POOLSIZE },
  acquireConnectionTimeout: 5000,
};
