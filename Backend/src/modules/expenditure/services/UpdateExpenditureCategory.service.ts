import { inject, injectable } from 'tsyringe';
import IExpenditureCategoryRepository from '../interfaces/IExpenditureCategoryRepository';
import IUpdateExpenditureCategoryDTO from '../interfaces/IUpdateExpenditureCategoryDTO';
import { ExpenditureCategory } from '../models/entities/ExpenditureCategory';

@injectable()
export class UpdateExpenditureCategoryService {

    constructor(
        @inject('ExpenditureCategoryRepository')
        private repository: IExpenditureCategoryRepository,
    ) { }

    public async execute({ id, name, description }: IUpdateExpenditureCategoryDTO): Promise<ExpenditureCategory> {

        const expenditureCategory = await this.repository.update({
            name, description, id
        });

        return expenditureCategory;
    }
};