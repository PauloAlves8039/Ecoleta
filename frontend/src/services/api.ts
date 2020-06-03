/**
 * @file: api.ts
 * @author: Paulo Alves
 * @description: responsável pela comunicação com o backend.
 * @version 1.0.1 (03/06/2020)
 */

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;
