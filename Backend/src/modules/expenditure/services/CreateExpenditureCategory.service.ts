import { inject, injectable } from 'tsyringe';
import ICreateExpenditureCategoryDTO from '../interfaces/ICreateExpenditureCategoryDTO';
import IExpenditureCategoryRepository from '../interfaces/IExpenditureCategoryRepository';
import { ExpenditureCategory } from '../models/entities/ExpenditureCategory';

@injectable()
export class CreateExpenditureCategoryService {

    constructor(
        @inject('ExpenditureCategoryRepository')
        private repository: IExpenditureCategoryRepository,
    ) { }

    public async execute({ name, description, idCompany }: ICreateExpenditureCategoryDTO): Promise<ExpenditureCategory> {

        const expenditureCategory = await this.repository.create({
            name, description, idCompany
        });

        return expenditureCategory;
    }
};