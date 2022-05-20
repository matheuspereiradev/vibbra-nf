import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IExpenditureCategoryRepository from '../interfaces/IExpenditureCategoryRepository';
import IUpdateExpenditureCategoryDTO from '../interfaces/IUpdateExpenditureCategoryDTO';
import { ExpenditureCategory } from '../models/entities/ExpenditureCategory';

@injectable()
export class UpdateExpenditureCategoryService {

    constructor(
        @inject('ExpenditureCategoryRepository')
        private repository: IExpenditureCategoryRepository,
    ) { }

    public async execute({ id, name, description }: IUpdateExpenditureCategoryDTO, idCompany: number): Promise<ExpenditureCategory> {

        const category = await this.repository.findByID(idCompany, id);

        if (!category)
            throw new AppError('Category not found')

        const expenditureCategory = await this.repository.update({
            name, description, id
        });

        return expenditureCategory;
    }
};