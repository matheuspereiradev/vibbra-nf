import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../../../shared/providers/HashProvider/models/IHashProvider';
import IUserRepository from '../interfaces/IUserRepository';
import { User } from '../models/entities/User';
interface Auth {
    email: string,
    password: string
}
export interface ReturnUserAuth {
    user: User,
    token: string
}
@injectable()
class AuthUserService {

    constructor(
        @inject('UserRepository')
        private repository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }

    async authenticate({ email, password }: Auth): Promise<ReturnUserAuth> {

        const user = await this.repository.findByEmail(email);

        if (!user) {
            throw new AppError('Email or password invalid', 401);
        }


        const passwordMatch = await this.hashProvider.compareHash(password, user.password);
        if (!passwordMatch) {
            throw new AppError('Email or password invalid', 401);
        }


        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: String(user.id),
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );


        return {
            user,
            token
        };
    }
}

export { AuthUserService };
