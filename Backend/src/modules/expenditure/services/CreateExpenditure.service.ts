import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import ICompanyRepository from '../../company/interfaces/ICompanyRepository';
import ICreateExpenditureDTO from '../interfaces/ICreateExpenditureDTO';
import IExpenditureRepository from '../interfaces/IExpenditureRepository';
import { Expenditure } from '../models/entities/Expenditure';

@injectable()
export class CreateExpenditureService {

    constructor(
        @inject('ExpenditureRepository')
        private repository: IExpenditureRepository,

        @inject('CompanyRepository')
        private companyRepository: ICompanyRepository

    ) { }

    public async execute({ amount, competence, description, idCompany, idProvider, idCategory, paymentDate }: ICreateExpenditureDTO): Promise<Expenditure> {

        await this.validateCompany(idCompany);

        const expenditure = await this.repository.create({
            amount, competence, description, idCompany, idCategory, paymentDate, idProvider
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