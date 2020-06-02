/**
 * @file: 01_create_items.ts
 * @author: Paulo Alves
 * @description: migration responsável pela criação da tabela items.
 * @version 1.0.1 (02/06/2020)
 */

import Knex from 'knex';

/**
 * Responsável por criar as configurações da tabela items.
 * @param knex parâmetro para criação da tabela.
 * @function
 * @name up
 */
export async function up(knex: Knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

/**
 * Responsável por excluir as configurações da tabela items.
 * @param knex parâmetro para exclusão da tabela.
 * @function
 * @name down
 */
export async function down(knex: Knex) {
    return knex.schema.dropTable('items');
}