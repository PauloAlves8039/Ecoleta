/**
 * @file: routes.ts
 * @author: Paulo Alves
 * @description: responsável pela configuração das rotas da apicação.
 * @version 1.0.1 (02/06/2020)
 */

import express, { request, response } from 'express';
import knex from './database/connection';

const routes = express.Router();

/**
 * @description: GET - rota responsável por listar todos os itens.
 */
routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*');
    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        };      
    });
    return response.json(serializedItems);    
});

/**
 * @description: POST - rota responsável por inserir pontos de coleta.
 */
routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

    const trx = await knex.transaction();
    
    const insertedIds = await trx('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    });

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id,
        };
    });
    
    await trx('point_items').insert(pointItems);

    return response.json({ success: true });
});

export default routes;