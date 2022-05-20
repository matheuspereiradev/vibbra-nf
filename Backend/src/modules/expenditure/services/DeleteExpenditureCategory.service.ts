import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IExpenditureCategoryRepository from '../interfaces/IExpenditureCategoryRepository';

@injectable()
export class DeleteExpenditureCategoryService {
    constructor(
        @inject('ExpenditureCategoryRepository')
        private repository: IExpenditureCategoryRepository
    ) { }

    public async execute(id: number, idCompany: number): Promise<void> {

        const category = await this.repository.findByID(idCompany, id);

        if (!category)
            throw new AppError('Category not found')


        await this.repository.delete(id);
    }


}