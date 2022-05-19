import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import ICompanyRepository from '../../company/interfaces/ICompanyRepository';
import IUserRepository from '../../user/interfaces/IUserRepository';
import IProviderRepository from '../interfaces/IProviderRepository';


@injectable()
export class DeleteProviderService {
    constructor(
        @inject('ProviderRepository')
        private repository: IProviderRepository,
    ) { }

    public async execute(id: number, idCompany:number): Promise<void> {
        
        const provider = await this.repository.findByID(id,idCompany);
        if(!provider)
            throw new AppError('Provider not found')

        await this.repository.delete(id);
        return;
    }


}