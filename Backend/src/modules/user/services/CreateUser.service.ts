import { sign } from 'jsonwebtoken';
import Error from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../../../shared/providers/HashProvider/models/IHashProvider';
import { User } from '../models/entities/User';
import IUserRepository from '../interfaces/IUserRepository';
import ICreateUserDTO from '../interfaces/ICreateUserDTO';
import AppError from '../../../shared/errors/AppError';


@injectable()
export class CreateUserService {

    constructor(
        @inject('UserRepository')
        private repository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider

    ) { }

    public async execute({ email, name, password, surname,idCompany }: ICreateUserDTO): Promise<User> {

        await this.validateEmail(email);
        const hashedPassword = await this.hashProvider.genarateHash(password);
        const user = await this.repository.create({
            email, name, password: hashedPassword, surname, idCompany
        });

        return user;
    }

    public async validateEmail(email: string): Promise<void> {
        const emailAlreadyUse = await this.repository.findByEmail(email);

        if (emailAlreadyUse) {

            throw new AppError('Email already in use', 409);

        }
    }
};