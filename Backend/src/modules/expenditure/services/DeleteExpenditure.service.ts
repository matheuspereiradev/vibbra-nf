import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IExpenditureRepository from '../interfaces/IExpenditureRepository';


@injectable()
export class DeleteExpenditureService {
    constructor(
        @inject('ExpenditureRepository')
        private repository: IExpenditureRepository
    ) { }

    public async execute(id: number, idCompany: number): Promise<void> {
        const expediture = await this.repository.findByID(idCompany,id);

        if(!expediture)
            throw new AppError('Expenditure not found')

        await this.repository.delete(id);
    }


}