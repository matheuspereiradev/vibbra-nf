
import { FindConditions, getRepository, In, Repository } from 'typeorm';
import IProductRepository from '../../interfaces/IProductRepository';
import ICreateProductDTO from '../../interfaces/ICreateProductDTO';
import IUpdateProductDTO from '../../interfaces/IUpdateProductDTO';
import { Product } from '../entities/Product';

export class ProductRepository implements IProductRepository {

    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = getRepository(Product)
    }

    public async findByID(id: number, idCompany: number): Promise<Product> {
        const all = await this.ormRepository.findOne({ where: { id, idCompany }, relations: ['type', 'meansureUnit'] });
        return all;
    };

    public async findAll(idCompany: number, types = ['SRV', 'PPD', 'ALM', 'INS', 'PAC']): Promise<Array<Product>> {
        const all = await this.ormRepository.find({
            relations: ['meansureUnit', 'type'],
            where: {
                idCompany,
                type: {
                    id: In(types),
                    
                }
            }
        });
        return all;
    }

    public async create(data: ICreateProductDTO): Promise<Product> {
        const product = this.ormRepository.create(data);
        await this.ormRepository.save(product);
        return product;
    }

    public async update({ name, barcode, brandProduct, details, idMeansureUnit, id, purchasePrice, salePrice, stockMin }: IUpdateProductDTO): Promise<Product> {
        const product = await this.ormRepository.findOne({ where: { id } });
        Object.assign(product, { name, barcode, brandProduct, details, idMeansureUnit, purchasePrice, salePrice, stockMin });
        await this.ormRepository.save(product);
        return product;
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.softDelete(id);
        return;
    }


};