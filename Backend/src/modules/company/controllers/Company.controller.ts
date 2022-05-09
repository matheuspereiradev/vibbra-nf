import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CompanyRepository } from '../models/repositories/Company.repository';
import { CreateCompanyService } from '../services/CreateCompany.service';
import { DeleteCompanyService } from '../services/DeleteCompany.service';
import { UpdateCompanyService } from '../services/UpdateCompany.service';
import companyView from '../views/company.view';

export class CompanyController {

    async show(request: Request, response: Response) {
        const userRepository = new CompanyRepository();
        const all = await userRepository.findAll();
        return response.status(200).json(companyView.renderMany(all));
    }
    async find(request: Request, response: Response) {
        const { id } = request.params;
        const userRepository = new CompanyRepository();
        const company = await userRepository.findByID(+id);
        return response.status(200).json(companyView.render(company));
    }

    async create(request: Request, response: Response) {
        const { name, cnpj, corporateName } = request.body;
        const createService = container.resolve(CreateCompanyService);
        const company = await createService.execute({ name, cnpj, corporateName })
        return response.status(201).json(companyView.render(company));
    }

    async update(request: Request, response: Response) {
        const { name, cnpj, corporateName } = request.body;
        const { id } = request.params;
        const updateCompanyService = container.resolve(UpdateCompanyService);
        const company = await updateCompanyService.execute({ id: +id, name, cnpj, corporateName });
        return response.status(200).json(companyView.render(company));

    }
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const deleteCompanyService = container.resolve(DeleteCompanyService);
        await deleteCompanyService.execute(+id);
        return response.status(200).json({ message: "Successfuly excluded" });
    }

};