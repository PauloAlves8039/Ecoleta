/**
 * @file: ItemsConstroller.ts
 * @author: Paulo Alves
 * @description: controlador responsável por funcionalidades referentes a entidade Items.
 * @version 1.0.1 (02/06/2020)
 */

import { Request, Response } from 'express';
import knex from '../database/connection';

/**
  * Representação da entidade Items.
  * @class
  */
class ItemsConstroller {
    /**
     * Responsável por listar todos os registros dos Items.
     * @function
     * @name index
     * @param request parâmetro de requisição no servidor.
     * @param response parâmetro de resposta no servidor.
     */
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*');
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`
            };
        });
        return response.json(serializedItems);
    }
}

export default ItemsConstroller;
