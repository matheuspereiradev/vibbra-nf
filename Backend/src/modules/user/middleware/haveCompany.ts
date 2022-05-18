import { NextFunction, Request, Response } from 'express';
import AppError from '../../../shared/errors/AppError';
import { UserRepository } from '../models/repositories/User.repository';

/**
    In this middleware is get the company details for user
 */

const haveCompany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const email = request.user.email;

    const userRepository = new UserRepository();
    const user = await userRepository.findByEmail(email);

    if(!user.idCompany)
        throw new AppError('User not have a company')

    request.company = {
        id: +user.idCompany
    }

    return next();

}

export default haveCompany;