/**
 * @file: create_items.ts
 * @author: Paulo Alves
 * @description: responsável por cadastrar novos registros dos items.
 * @version 1.0.1 (02/06/2020)
 */

import Knex from 'knex';

/**
 * Responsável por inserir novos registros na tabela items.
 * @function 
 * @name seed
 * @param Knex parâmetro para inserir items.
 */
export async function seed(Knex: Knex) {
    await Knex('items').insert([
        { title: 'Lâmpadas', image: 'lampadas.svg'},
        { title: 'Pilhas e Baterias', image: 'baterias.svg'},
        { title: 'Papéis e Papelão', image: 'papeis-papelao.svg'},
        { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg'},
        { title: 'Resíduos Orgânicos', image: 'organicos.svg'},
        { title: 'Óleo de Cozinha', image: 'oleo.svg'},
    ]);
}