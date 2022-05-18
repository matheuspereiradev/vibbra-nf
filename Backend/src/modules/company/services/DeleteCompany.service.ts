import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../user/interfaces/IUserRepository';
import ICompanyRepository from '../interfaces/ICompanyRepository';


@injectable()
export class DeleteCompanyService {
    constructor(
        @inject('CompanyRepository')
        private repository: ICompanyRepository,

        @inject('UserRepository')
        private repositoryUser: IUserRepository,
    ) { }

    public async execute(id: number): Promise<void> {
        const owner = await this.repositoryUser.findOwner(id)
        await this.repositoryUser.setOwner(owner.id, null, false)
        await this.repositoryUser.removeCompanyFromUsers(id)
        await this.repository.delete(id);
    }


}