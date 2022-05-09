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

        @inject('CompanyRepository')
        private companyRepository: ICompanyRepository

    ) { }

    public async execute({ id, amount, competence, description, idCompany, idCategory, paymentDate }: IUpdateExpenditureDTO): Promise<Expenditure> {

        await this.validateCompany(idCompany);

        const expenditure = await this.repository.update({
            id, amount, competence, description, idCompany, idCategory, paymentDate
        });

        return expenditure;
    }

    public async validateCompany(idCompany: number): Promise<void> {
        const company = await this.companyRepository.findByID(idCompany);

        if (!company) {
            throw new AppError('Company not found', 400);
        }
    }

};