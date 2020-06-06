/**
 * @file: routes.ts
 * @author: Paulo Alves
 * @description: responsável pela chamada das rotas da apicação.
 * @version 1.0.1 (02/06/2020)
 */

import express from 'express';

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
routes.post('/points', upload.single('image'), pointsController.create);

/**
 * @description: rota responsável por listar todos os pontos de coleta.
 */
routes.get('/points', pointsController.index);

/**
 * @description: rota responsável por listar um ponto de coleta.
 */
routes.get('/points/:id', pointsController.show);

export default routes;