/**
 * @file: server.ts
 * @author: Paulo Alves
 * @description: responsável pelas configurações do servidor no backend.
 * @version 1.0.1 (01/06/2020)
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(3333);