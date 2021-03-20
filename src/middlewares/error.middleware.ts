import { NextFunction, Request, Response } from 'express';
import {HttpException} from '../exceptionTypes/HttpException';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number = error.status || 500;
        const message: string = error.message || 'Something went wrong';

        console.log(`StatusCode : ${status}, Message : ${message}`);
        res.status(status).json({ message });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;
