import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../interfaces/IUserRepository';


@injectable()
export class DeleteUserService {
    constructor(
        @inject('UserRepository')
        private repository: IUserRepository
    ) { }

    public async execute(id: number, idCompany:number): Promise<void> {
        const user = await this.repository.findByID(id,idCompany)

        if(!user)
            throw new AppError('User not found')

        await this.repository.delete(id);
    }


}