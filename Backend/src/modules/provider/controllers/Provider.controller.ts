import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProviderRepository } from '../models/repositories/Provider.repository';
import { CreateProviderService } from '../services/CreateProvider.service';
import { DeleteProviderService } from '../services/DeleteProvider.service';
import { UpdateProviderService } from '../services/UpdateProvider.service';

export class ProviderController {

    async find(request: Request, response: Response) {
        const idCompany = request.company.id;
        const { id } = request.params;
        const providerRepository = new ProviderRepository();
        const provider = await providerRepository.findByID(+id, idCompany);
        return response.status(200).json(provider);
    }

    async show(request: Request, response: Response) {
        const idCompany = request.company.id;
        const providerRepository = new ProviderRepository();
        const provider = await providerRepository.findAll(idCompany);
        return response.status(200).json(provider);
    }

    async create(request: Request, response: Response) {
        const { name, corporateName } = request.body;
        const idCompany = request.company.id;
        const createService = container.resolve(CreateProviderService);
        const provider = await createService.execute({ name, idCompany, corporateName })
        return response.status(201).json(provider);
    }

    async update(request: Request, response: Response) {
        const { name, cnpj, corporateName } = request.body;
        const idCompany = request.company.id;
        const { id } = request.params;
        const updateService = container.resolve(UpdateProviderService);
        const provider = await updateService.execute({ id: +id, name, corporateName, idCompany });
        return response.status(200).json(provider);
    }

    async delete(request: Request, response: Response) {
        const idCompany = request.company.id;
        const { id } = request.params;
        const deleteService = container.resolve(DeleteProviderService);
        await deleteService.execute(+id, idCompany);
        return response.status(200).json({ message: "Successfuly excluded" });
    }

};