
import { getRepository, Repository } from 'typeorm';
import IProviderRepository from '../../interfaces/IProviderRepository';
import ICreateProviderDTO from '../../interfaces/ICreateProviderDTO';
import IUpdateProviderDTO from '../../interfaces/IUpdateProviderDTO';
import { Provider } from '../entities/Provider';

export class ProviderRepository implements IProviderRepository {

    private ormRepository: Repository<Provider>;

    constructor() {
        this.ormRepository = getRepository(Provider)
    }

    public async findByID(id: number,idCompany:number): Promise<Provider> {
        const all = await this.ormRepository.findOne({ where: { id, idCompany } });
        return all;
    };

    public async findAll(idCompany:number): Promise<Array<Provider>> {
        const all = await this.ormRepository.find({where:{idCompany}});
        return all;
    }

    public async create(data: ICreateProviderDTO): Promise<Provider> {
        const provider = this.ormRepository.create(data);
        await this.ormRepository.save(provider);
        return provider;
    }
    public async update({ name, corporateName, id,idCompany }: IUpdateProviderDTO): Promise<Provider> {
        const provider = await this.ormRepository.findOne({ where: { id, idCompany } });
        Object.assign(provider, { name, corporateName });
        await this.ormRepository.save(provider);
        return provider;
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.softDelete(id);
        return;
    }


};