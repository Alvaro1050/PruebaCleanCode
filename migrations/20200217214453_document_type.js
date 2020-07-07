exports.up = knex =>
  knex.schema.createTable('document_type', (table) => {
    table.increments('id').notNullable();
    table.string('description').notNullable();
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable('document_type');
