/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable('eventos', (table) => {
      table.increments('id');
      table.string('nome', 255).notNullable();
      table.string('descricao', 255).notNullable();
      table.string('data', 255).notNullable();
      table.integer('autor_id').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('eventos');
}

// npx knex --knexfile=./src/db/knexfile.js migrate:make livraria
