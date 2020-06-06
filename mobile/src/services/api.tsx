/**
 * @file: api.tsx
 * @author: Paulo Alves
 * @description: responsável pela integração com a api do backend.
 * @version 1.0.1 (05/06/2020)
 */

import axios from 'axios';

/**
 * @description cria uma comunicação com a api do backend.
 */
const api = axios.create({
    baseURL: 'http://192.168.1.108:3333'
});

export default api;