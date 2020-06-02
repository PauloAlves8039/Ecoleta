/**
 * @file: routes.ts
 * @author: Paulo Alves
 * @description: responsável pela configuração das rotas da apicação.
 * @version 1.0.1 (02/06/2020)
 */

import express from 'express';
import knex from './database/connection';

const routes = express.Router();

/**
 * @description: GET - rota responsável por listar todos os itens.
 */
routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*');
    const serializedItems = items.map(item => {
        return {
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        };      
    });
    return response.json(serializedItems);    
});

export default routes;