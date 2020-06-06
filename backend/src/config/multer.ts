/**
 * @file: multer.ts
 * @author: Paulo Alves
 * @description: responsável pelas configurações de upload de arquivos.
 * @version 1.0.1 (06/06/2020)
 */

import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex');

            const fileName = `${hash}-${file.originalname}`;

            callback(null, fileName);
        }
    }),
};