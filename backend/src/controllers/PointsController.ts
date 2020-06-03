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
     * Responsável por listar todos os registros referentes a entidade Points.
     * @function
     * @name index
     * @param request parâmetro de requisição no servidor.
     * @param response parâmetro de resposta no servidor.
     */
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parseItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parseItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
    }

    /**
     * Responsável por listar um registro referente a entidade Points.
     * @function
     * @name show
     * @param request parâmetro de requisição no servidor.
     * @param response parâmetro de resposta no servidor.
     */
    async show(request: Request, response: Response) {
        const { id } = request.params;
        
        const point =await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json({ message: 'Point not found.' });
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.item_id', id)
            .select('items.title');

        return response.json({ point, items });
    }
    
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
            image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
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

        await trx.commit();

        return response.json({ 
            id: point_id,
            ...point,
        });
    }
}

export default PointsController; 