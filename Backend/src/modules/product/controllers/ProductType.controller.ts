import { Request, Response } from 'express';
import { ProductTypeRepository } from '../models/repositories/ProductType.repository';

export class ProductTypeController {

    async find(request: Request, response: Response) {
        const { id } = request.params;
        const productTypeRepository = new ProductTypeRepository();
        const productType = await productTypeRepository.findByID(+id);
        return response.status(200).json(productType);
    }

    async show(request: Request, response: Response) {
        const productTypeRepository = new ProductTypeRepository();
        const productType = await productTypeRepository.findAll();
        return response.status(200).json(productType);
    }


};