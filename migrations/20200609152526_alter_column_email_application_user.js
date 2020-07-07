exports.up = knex => knex.schema.alterTable('application_user', (table) => {
  table.unique('email');
});
exports.down = knex => knex.schema.dropTable('application_user');
