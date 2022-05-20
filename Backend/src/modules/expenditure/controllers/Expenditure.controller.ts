import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Expenditure } from '../models/entities/Expenditure';
import { ExpenditureRepository } from '../models/repositories/Expenditure.repository';
import { CreateExpenditureService } from '../services/CreateExpenditure.service';
import { DeleteExpenditureService } from '../services/DeleteExpenditure.service';
import { UpdateExpenditureService } from '../services/UpdateExpenditure.service';
import expenditureView from '../views/expenditure.view';

export class ExpenditureController {

    async show(request: Request, response: Response) {
        const { competence } = request.query;
        const idCompany = request.company.id;
        const expenditureRepository = new ExpenditureRepository();
        let all:Expenditure[];
        if (!competence)
            all = await expenditureRepository.findAll(idCompany);
        else
            all = await expenditureRepository.findByCompetence(idCompany, competence.toString())
        return response.status(200).json(expenditureView.renderMany(all));
    }

    async find(request: Request, response: Response) {
        const idCompany = request.company.id;
        const { id } = request.params
        const expenditureRepository = new ExpenditureRepository();
        const expenditure = await expenditureRepository.findByID(idCompany, +id);
        return response.status(200).json(expenditureView.render(expenditure));
    }

    async create(request: Request, response: Response) {
        const idCompany = request.company.id;
        const { amount, description, competence, paymentDate, idProvider, idCategory } = request.body;
        const createService = container.resolve(CreateExpenditureService);
        const expenditure = await createService.execute({ amount, competence, description, idCompany, idProvider, idCategory, paymentDate })
        return response.status(201).json(expenditureView.render(expenditure));
    }

    async update(request: Request, response: Response) {
        const { amount, description, competence, paymentDate, idCategory, idProvider } = request.body;
        const { id } = request.params;
        const idCompany = request.company.id;
        const updateService = container.resolve(UpdateExpenditureService);
        const expenditure = await updateService.execute({ id: +id, amount, paymentDate, description, competence, idCategory, idProvider }, idCompany);
        return response.status(200).json(expenditureView.render(expenditure));
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const idCompany = request.company.id;
        const deleteService = container.resolve(DeleteExpenditureService);
        await deleteService.execute(+id,idCompany);
        return response.status(200).json({ message: "Successfuly excluded" });
    }

};