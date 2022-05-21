import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IProviderRepository from '../interfaces/IProviderRepository';
import IUpdateProviderDTO from '../interfaces/IUpdateProviderDTO';
import { Provider } from '../models/entities/Provider';


@injectable()
export class UpdateProviderService {
    constructor(
        @inject('ProviderRepository')
        private repository: IProviderRepository
    ) { }

    public async execute({ id, corporateName, name,idCompany }: IUpdateProviderDTO): Promise<Provider> {


        if (!await this.repository.findByID(id,idCompany))
            throw new AppError('Provider not found')

        const provider = await this.repository.update({
            id, corporateName, name,idCompany
        });

        return provider;
    }

}