import { inject, injectable } from 'tsyringe';
import ICreateProductDTO from '../interfaces/ICreateProductDTO';
import IProductRepository from '../interfaces/IProductRepository';
import { Product } from '../models/entities/Product';


@injectable()
export class CreateProductService {

    constructor(
        @inject('ProductRepository')
        private repository: IProductRepository,

    ) { }

    public async execute({ idCompany, barcode, brandProduct, details, purchasePrice,idMeansureUnit, salePrice, stockMin, idType, name }: ICreateProductDTO): Promise<Product> {

        const product = await this.repository.create({
            idCompany, barcode, brandProduct, details, purchasePrice, salePrice, name, stockMin, idType,idMeansureUnit
        });

        return product;
    }

};