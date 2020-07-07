exports.up = knex =>
  knex.schema.createTable('user_address', (table) => {
    table.increments('id').notNullable();
    table.decimal('latitude', null, null).notNullable();
    table.decimal('length', null, null).notNullable();
    table.string('description');
    table.integer('application_user_id').notNullable();
    table.foreign('application_user_id').references('id').inTable('application_user');
    table.unique(['application_user_id', 'latitude', 'length']);
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable('user_address');
