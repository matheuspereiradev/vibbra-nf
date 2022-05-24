import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IProductRepository from '../interfaces/IProductRepository';
import IUpdateProductDTO from '../interfaces/IUpdateProductDTO';
import { Product } from '../models/entities/Product';


@injectable()
export class UpdateProductService {
    constructor(
        @inject('ProductRepository')
        private repository: IProductRepository
    ) { }

    public async execute({ id, barcode, brandProduct, details, name,idMeansureUnit, stockMin, purchasePrice, salePrice }: IUpdateProductDTO, idCompany: number): Promise<Product> {


        if (!await this.repository.findByID(id, idCompany))
            throw new AppError('Product not found')

        const provider = await this.repository.update({
            id, barcode, brandProduct, details, name, purchasePrice, salePrice, stockMin,idMeansureUnit
        });

        return provider;
    }

}