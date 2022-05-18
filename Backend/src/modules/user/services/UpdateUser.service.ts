import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../../../shared/providers/HashProvider/models/IHashProvider';
import IUpdateUserDTO from '../interfaces/IUpdateUserDTO';
import IUserRepository from '../interfaces/IUserRepository';
import { User } from '../models/entities/User';


@injectable()
export class UpdateUserService {
    constructor(
        @inject('UserRepository')
        private repository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }

    public async execute({ id, email, name, password, surname }: IUpdateUserDTO, idCompany:number): Promise<User> {
        await this.validateEmail(id, email);
        const userFound = await this.repository.findByID(id,idCompany);
        if (!userFound)
            throw new AppError('User not found')

        const hashedPassword = await this.getHashPassword(password, userFound.email);
        const user = await this.repository.update({
            id, email, name, password: hashedPassword, surname
        });

        return user;
    }

    public async getHashPassword(password: string, email: string): Promise<string> {
        if (password)
            return await this.hashProvider.genarateHash(password);
        else {
            const user = await this.repository.findByEmail(email);
            return user.password;
        }

    }

    public async validateEmail(id: number, email: string): Promise<void> {
        const user = await this.repository.findByEmail(email);

        if (user && id !== user.id) {
            throw new AppError('Email already in use', 409);
        }
    }

}