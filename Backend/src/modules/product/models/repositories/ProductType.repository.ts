
import { getRepository, Repository } from 'typeorm';
import IProductTypeRepository from '../../interfaces/IProductTypeRepository';
import { ProductType } from '../entities/ProductType';

export class ProductTypeRepository implements IProductTypeRepository {

    private ormRepository: Repository<ProductType>;

    constructor() {
        this.ormRepository = getRepository(ProductType)
    }

    public async findByID(id: number): Promise<ProductType> {
        const all = await this.ormRepository.findOne({ where: { id } });
        return all;
    };

    public async findAll(): Promise<Array<ProductType>> {
        const all = await this.ormRepository.find();
        return all;
    }
};