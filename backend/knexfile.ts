/**
 * @file: knexfile.ts
 * @author: Paulo Alves
 * @description: responsável pela execução dos arquivos de conexão e migrations.
 * @version 1.0.1 (02/06/2020)
 */

import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations' )
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds' )
    },
    useNullAsDefault: true,
};