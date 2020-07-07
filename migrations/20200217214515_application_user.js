exports.up = knex =>
  knex.schema.createTable('application_user', (table) => {
    table.increments('id').notNullable();
    table.string('name').notNullable();
    table.string('last_name').notNullable();
    table.string('phone').notNullable();
    table.string('document_number').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.integer('document_type_id').notNullable();
    table.foreign('document_type_id').references('id').inTable('document_type');
    table.unique(['document_type_id', 'document_number']);
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable('application_user');
