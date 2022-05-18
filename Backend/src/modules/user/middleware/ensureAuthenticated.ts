import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../../../shared/errors/AppError';
import Error from '../../../shared/errors/AppError';

interface TokenPayload {
    email: string,
    name: string,
    iat: number,
    exp: number,
    sub: string
}

/**
    In this middleware is make the validation of token
 */

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("JWT token not definided", 403);
    }

    let decode
    try {
        decode = verify(authHeader.replace('Bearer ', ''), process.env.JWT_SECRET);
    } catch (e) {
        throw new AppError('Token is not valid')
    }

    const { sub, email, name } = decode as TokenPayload;

    request.user = {
        email: email,
        name: name,
        id: +sub,
    }

    return next();

}