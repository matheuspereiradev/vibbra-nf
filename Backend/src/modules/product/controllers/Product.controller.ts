import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProductRepository } from '../models/repositories/Product.repository';
import { CreateProductService } from '../services/CreateProduct.service';
import { DeleteProductService } from '../services/DeleteProduct.service';
import { UpdateProductService } from '../services/UpdateProduct.service';

export class ProductController {

    async find(request: Request, response: Response) {
        const idCompany = request.company.id;
        const { id } = request.params;
        const productRepository = new ProductRepository();
        const product = await productRepository.findByID(+id, idCompany);
        return response.status(200).json(product);
    }

    async show(request: Request, response: Response) {
        const idCompany = request.company.id;
        const productRepository = new ProductRepository();
        const product = await productRepository.findAll(idCompany);
        return response.status(200).json(product);
    }

    async create(request: Request, response: Response) {
        const { name, barcode, brandProduct, details, purchasePrice, salePrice } = request.body;
        const idCompany = request.company.id;
        const createService = container.resolve(CreateProductService);
        const product = await createService.execute({ name, idCompany, barcode, brandProduct, details, purchasePrice, salePrice })
        return response.status(201).json(product);
    }

    async update(request: Request, response: Response) {
        const { name, barcode, brandProduct, details, purchasePrice, salePrice } = request.body;
        const idCompany = request.company.id;
        const { id } = request.params;
        const updateService = container.resolve(UpdateProductService);
        const product = await updateService.execute({ id: +id, name, barcode, brandProduct, details, purchasePrice, salePrice }, idCompany);
        return response.status(200).json(product);
    }

    async delete(request: Request, response: Response) {
        const idCompany = request.company.id;
        const { id } = request.params;
        const deleteService = container.resolve(DeleteProductService);
        await deleteService.execute(+id, idCompany);
        return response.status(200).json({ message: "Successfuly excluded" });
    }

};