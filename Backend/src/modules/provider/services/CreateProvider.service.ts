import { inject, injectable } from 'tsyringe';
import ICreateProviderDTO from '../interfaces/ICreateProviderDTO';
import IProviderRepository from '../interfaces/IProviderRepository';
import { Provider } from '../models/entities/Provider';


@injectable()
export class CreateProviderService {

    constructor(
        @inject('ProviderRepository')
        private repository: IProviderRepository,

    ) { }

    public async execute({ idCompany, corporateName, name }: ICreateProviderDTO): Promise<Provider> {

        const provider = await this.repository.create({
            idCompany, corporateName, name
        });

        return provider;
    }

};