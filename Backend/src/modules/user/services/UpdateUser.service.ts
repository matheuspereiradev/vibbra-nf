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

    public async execute({ id, email, name, password, surname }: IUpdateUserDTO): Promise<User> {
        await this.validateEmail(id, email);

        if (!await this.repository.findByID(id))
            throw new AppError('User not found')

        const hashedPassword = await this.getHashPassword(password, id);
        const user = await this.repository.update({
            id, email, name, password: hashedPassword, surname
        });

        return user;
    }

    public async getHashPassword(password: string, id: number): Promise<string> {
        if (password)
            return await this.hashProvider.genarateHash(password);
        else {
            const user = await this.repository.findByID(id);
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