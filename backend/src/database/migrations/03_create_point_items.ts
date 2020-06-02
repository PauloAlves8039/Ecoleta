/**
 * @file: 03_create_point_items.ts
 * @author: Paulo Alves
 * @description: migration responsável pelo relacionamento entre as tabelas points e items.
 * @version 1.0.1 (02/06/2020)
 */

import Knex from 'knex';

/**
 * Responsável por criar as configurações de relacionamento entre as tabelas points e items.
 * @param knex parâmetro para criação do relacionamento das tabelas.
 * @function
 * @name up
 */
export async function up(knex: Knex) {
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();
        
        table.integer('point_id')
        .notNullable()
        .references('id')
        .inTable('points');

        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items');
    });
}

/**
 * Responsável por restaurar as configurações de relacionamento entre as tabelas points e items.
 * @param knex parâmetro para exclusão do relacionamento das tabelas.
 * @function
 * @name down
 */
export async function down(knex: Knex) {
    return knex.schema.dropTable('point_items');
}