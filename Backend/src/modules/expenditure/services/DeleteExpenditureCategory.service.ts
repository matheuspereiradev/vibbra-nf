import { inject, injectable } from 'tsyringe';
import IExpenditureCategoryRepository from '../interfaces/IExpenditureCategoryRepository';

@injectable()
export class DeleteExpenditureCategoryService {
    constructor(
        @inject('ExpenditureCategoryRepository')
        private repository: IExpenditureCategoryRepository
    ) { }

    public async execute(id: number): Promise<void> {
        await this.repository.delete(id);
    }


}