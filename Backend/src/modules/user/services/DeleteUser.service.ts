import { inject, injectable } from 'tsyringe';
import IUserRepository from '../interfaces/IUserRepository';


@injectable()
export class DeleteUserService {
    constructor(
        @inject('UserRepository')
        private repository: IUserRepository
    ) { }

    public async execute(id: number): Promise<void> {
        await this.repository.delete(id);
    }


}