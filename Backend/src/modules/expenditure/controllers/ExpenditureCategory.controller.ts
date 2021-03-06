import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ExpenditureCategoryRepository } from '../models/repositories/ExpenditureCategory.repository';
import { CreateExpenditureService } from '../services/CreateExpenditure.service';
import { CreateExpenditureCategoryService } from '../services/CreateExpenditureCategory.service';
import { DeleteExpenditureCategoryService } from '../services/DeleteExpenditureCategory.service';
import { UpdateExpenditureService } from '../services/UpdateExpenditure.service';
import { UpdateExpenditureCategoryService } from '../services/UpdateExpenditureCategory.service';
import expenditureCategoryView from '../views/expenditureCategory.view';

export class ExpenditureCategoryController {

    async show(request: Request, response: Response) {
        const expenditureCategoryRepository = new ExpenditureCategoryRepository();
        const all = await expenditureCategoryRepository.findAll();
        return response.status(200).json(expenditureCategoryView.renderMany(all));
    }
    async find(request: Request, response: Response) {
        const { id } = request.params
        const expenditureCategoryRepository = new ExpenditureCategoryRepository();
        const category = await expenditureCategoryRepository.findByID(+id);
        return response.status(200).json(expenditureCategoryView.render(category));
    }

    async create(request: Request, response: Response) {
        const { name, description } = request.body;
        const createService = container.resolve(CreateExpenditureCategoryService);
        const category = await createService.execute({ name, description })
        return response.status(201).json(expenditureCategoryView.render(category));
    }

    async update(request: Request, response: Response) {
        const { name, description } = request.body;
        const { id } = request.params;
        const updateService = container.resolve(UpdateExpenditureCategoryService);
        const category = await updateService.execute({ id: +id, name, description });
        return response.status(200).json(expenditureCategoryView.render(category));
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const deleteService = container.resolve(DeleteExpenditureCategoryService);
        await deleteService.execute(+id);
        return response.status(200).json({ message: "Successfuly excluded" });
    }

};