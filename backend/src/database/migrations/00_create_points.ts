/**
 * @file: 00_create_points.ts
 * @author: Paulo Alves
 * @description: migration responsável pela criação da tabela points.
 * @version 1.0.1 (02/06/2020)
 */

import Knex from 'knex';

/**
 * Responsável por criar as configurações da tabela points.
 * @param knex parâmetro para criação da tabela.
 * @function
 * @name up 
 */
export async function up(knex: Knex) {
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
}

/**
 * Responsável por excluir as configurações da tabela points.
 * @param knex parâmetro para exclusão da tabela.
 * @function
 * @name down
 */
export async function down(knex: Knex) {
    return knex.schema.dropTable('points');
}