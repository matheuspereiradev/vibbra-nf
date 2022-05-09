import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors'
import cors from 'cors';
import CreateConnection from '../typeorm/index';
import { routes } from './routes/index.routes';
import 'reflect-metadata';
import { errors } from 'celebrate'
import path from 'path';

import '../../../shared/container'
import AppError from '../../../shared/errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
CreateConnection();

app.use('/files', express.static(path.resolve(__dirname, "..", "..", "..", "..", "temp")));

app.use(routes)

app.use(errors())
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {

        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                "error": err.message
            })
        };

        console.error(err);

        return response.status(500).json({
            "error": "internal server error."
        });

    })

export { app }