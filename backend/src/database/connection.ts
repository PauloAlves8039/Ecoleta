/**
 * @file: connection.ts
 * @author: Paulo Alves
 * @description: responsável pela conexão com o banco de dados.
 * @version 1.0.1 (02/06/2020)
 */

import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
});

export default connection;