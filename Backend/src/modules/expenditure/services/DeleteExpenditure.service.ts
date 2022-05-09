import { inject, injectable } from 'tsyringe';
import IExpenditureRepository from '../interfaces/IExpenditureRepository';


@injectable()
export class DeleteExpenditureService {
    constructor(
        @inject('ExpenditureRepository')
        private repository: IExpenditureRepository
    ) { }

    public async execute(id: number): Promise<void> {
        await this.repository.delete(id);
    }


}