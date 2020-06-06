/**
 * @file: routes.ts
 * @author: Paulo Alves
 * @description: responsável pela chamada das rotas da apicação.
 * @version 1.0.1 (02/06/2020)
 */

import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsConstroller from './controllers/ItemsConstroller';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsConstroller = new ItemsConstroller();

/**
 * @description: rota responsável por listar todos os itens.
 */
routes.get('/items', itemsConstroller.index);

/**
 * @description: rota responsável por inserir pontos de coleta.
 */
routes.post(
    '/points', 
    upload.single('image'),
     celebrate({
         body: Joi.object().keys({
             name: Joi.string().required(),
             email: Joi.string().required().email(),
             whatsapp: Joi.number().required(),
             latitude: Joi.number().required(),
             longitude: Joi.number().required(),
             city: Joi.string().required(),
             uf: Joi.string().required().max(2),
             items: Joi.string().required(),
         })
     }, {
         abortEarly: false
     }),
    pointsController.create
    );

/**
 * @description: rota responsável por listar todos os pontos de coleta.
 */
routes.get('/points', pointsController.index);

/**
 * @description: rota responsável por listar um ponto de coleta.
 */
routes.get('/points/:id', pointsController.show);

export default routes;