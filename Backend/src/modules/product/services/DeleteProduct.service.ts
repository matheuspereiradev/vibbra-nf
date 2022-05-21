import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IProductRepository from '../interfaces/IProductRepository';


@injectable()
export class DeleteProductService {
    constructor(
        @inject('ProductRepository')
        private repository: IProductRepository,
    ) { }

    public async execute(id: number, idCompany: number): Promise<void> {

        const product = await this.repository.findByID(id, idCompany);
        if (!product)
            throw new AppError('Product not found')

        await this.repository.delete(id);
        return;
    }


}