import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ExpenditureRepository } from '../models/repositories/Expenditure.repository';
import { CreateExpenditureService } from '../services/CreateExpenditure.service';
import { DeleteExpenditureService } from '../services/DeleteExpenditure.service';
import { UpdateExpenditureService } from '../services/UpdateExpenditure.service';
import expenditureView from '../views/expenditure.view';

export class ExpenditureController {

    async show(request: Request, response: Response) {
        const { competence } = request.query;
        const expenditureRepository = new ExpenditureRepository();
        let all;
        if (!competence)
            all = await expenditureRepository.findAll();
        else
            all = await expenditureRepository.findByCompetence(competence.toString())

        return response.status(200).json(expenditureView.renderMany(all));
    }
    async find(request: Request, response: Response) {
        const { id } = request.params
        const expenditureRepository = new ExpenditureRepository();
        const expenditure = await expenditureRepository.findByID(+id);
        return response.status(200).json(expenditureView.render(expenditure));
    }

    async create(request: Request, response: Response) {
        const { amount, description, competence, idCompany, paymentDate, idCategory } = request.body;
        const createService = container.resolve(CreateExpenditureService);
        const expenditure = await createService.execute({ amount, competence, description, idCompany, idCategory, paymentDate })
        return response.status(201).json(expenditureView.render(expenditure));
    }

    async update(request: Request, response: Response) {
        const { amount, description, competence, paymentDate, idCategory, idCompany } = request.body;
        const { id } = request.params;
        const updateService = container.resolve(UpdateExpenditureService);
        const expenditure = await updateService.execute({ id: +id, amount, paymentDate, description, competence, idCategory, idCompany });
        return response.status(200).json(expenditureView.render(expenditure));
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const deleteService = container.resolve(DeleteExpenditureService);
        await deleteService.execute(+id);
        return response.status(200).json({ message: "Successfuly excluded" });
    }

};