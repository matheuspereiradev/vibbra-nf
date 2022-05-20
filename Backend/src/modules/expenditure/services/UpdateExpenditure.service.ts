import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import ICompanyRepository from '../../company/interfaces/ICompanyRepository';
import ICreateExpenditureDTO from '../interfaces/ICreateExpenditureDTO';
import IExpenditureRepository from '../interfaces/IExpenditureRepository';
import IUpdateExpenditureDTO from '../interfaces/IUpdateExpenditureDTO';
import { Expenditure } from '../models/entities/Expenditure';

@injectable()
export class UpdateExpenditureService {

    constructor(
        @inject('ExpenditureRepository')
        private repository: IExpenditureRepository,
    ) { }

    public async execute({ id, amount, competence, description, idProvider, idCategory, paymentDate }: IUpdateExpenditureDTO,idCompany:number): Promise<Expenditure> {

        const expediture = await this.repository.findByID(idCompany,id);

        if(!expediture)
            throw new AppError('Expenditure not found')

        const expenditure = await this.repository.update({
            id, amount, competence, description, idProvider, idCategory, paymentDate
        });

        return expenditure;
    }

};