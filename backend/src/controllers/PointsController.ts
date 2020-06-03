/**
 * @file: PointsController.ts
 * @author: Paulo Alves
 * @description: controlador responsável por funcionalidades referentes a entidade Points.
 * @version 1.0.1 (02/06/2020)
 */

import { Request, Response } from 'express';
import knex from '../database/connection';

/**
 * Representação da entidade Points.
 * @class
 */
class PointsController {
    /**
     * Responsável pela inserção de registros referentes a entidade Points.
     * @function
     * @name create
     * @param request parâmetro de requisição no servidor.
     * @param response parâmetro de resposta no servidor.
     */
    async create(request: Request, response: Response) {
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

        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        });

        await trx('point_items').insert(pointItems);

        return response.json({ 
            id: point_id,
            ...point,
        });
    }
}

export default PointsController; 