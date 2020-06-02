/**
 * @file: routes.ts
 * @author: Paulo Alves
 * @description: responsável pela configuração das rotas da apicação
 * @version 1.0.1 (02/06/2020)
 */

import express from 'express';

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Hello World! '});    
});

export default routes;