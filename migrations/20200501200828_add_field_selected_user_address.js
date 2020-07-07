exports.up = knex => knex.schema.alterTable('user_address', (table) => {
  table.boolean('selected').defaultTo(false);
});

exports.down = knex => knex.schema.dropTable('user_address');
