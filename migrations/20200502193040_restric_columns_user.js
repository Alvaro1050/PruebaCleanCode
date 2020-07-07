exports.up = knex => knex.schema.alterTable('application_user', (table) => {
  table.string('name').alter();
  table.string('last_name').alter();
  table.string('phone').alter();
  table.string('document_number').alter();
  table.integer('document_type_id').alter();
});

exports.down = knex => knex.schema.dropTable('application_user');
