import { NextFunction, Request, Response } from 'express';
import AppError from '../../../shared/errors/AppError';
import { UserRepository } from '../models/repositories/User.repository';

/**
    In this middleware is get the company details for user
 */

const haveCompany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const userID = request.user.id;

    const userRepository = new UserRepository();
    const user = await userRepository.findByID(+userID);

    if(!user.idCompany)
        throw new AppError('User not have a company')

    request.company = {
        id: +user.idCompany
    }

    console.log(request.company)

    return next();

}

export default haveCompany;