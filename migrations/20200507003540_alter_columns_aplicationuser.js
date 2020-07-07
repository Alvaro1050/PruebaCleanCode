exports.up = knex => knex.schema.alterTable('application_user', (table) => {
  table.string('name').alter().notNullable();
});
exports.down = knex => knex.schema.dropTable('application_user');
