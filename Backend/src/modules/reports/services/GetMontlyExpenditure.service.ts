import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IExpenditureRepository from '../../expenditure/interfaces/IExpenditureRepository';
import IMontlyExpenditureGroupped from '../../expenditure/interfaces/IMontlyExpenditureGroupped.interface';



@injectable()
export class GetMontlyExpenditure {
    constructor(
        @inject('ExpenditureRepository')
        private expenditureRepository: IExpenditureRepository,

    ) { }

    public async execute(grouppedBy = "all", year = new Date().getFullYear()): Promise<any> {

        let dataByPaymentDate: IMontlyExpenditureGroupped[];
        let dataByCompetence: IMontlyExpenditureGroupped[];

        if (grouppedBy === 'competence' || grouppedBy === 'all')
            dataByCompetence = await this.getGrouppedByCompetence(year);
        if (grouppedBy === 'payment' || grouppedBy === 'all')
            dataByPaymentDate = await this.getGrouppedByPaymentDate(year)

        return { dataByCompetence, dataByPaymentDate };
    }

    public async getGrouppedByCompetence(year: number): Promise<IMontlyExpenditureGroupped[]> {
        const data = await this.expenditureRepository.findDataMontlyExpenditureGrouppedByCompetence(year)
        const result = [];
        for (let i = 1; i <= 12; i++) {
            const date = `${i.toString().padStart(2, '0')}/${year}`
            const expenditure = data.find((inv: IMontlyExpenditureGroupped) => inv.month === date)
            result.push({
                month: date,
                sum: expenditure?.sum || 0
            })

        }
        return result;

    }
    public async getGrouppedByPaymentDate(year: number) {
        const data = await this.expenditureRepository.findDataMontlyExpenditureGrouppedByPaymentDate(year)
        const result = [];
        for (let i = 1; i <= 12; i++) {
            const date = `${i.toString().padStart(2, '0')}/${year}`
            const expenditure = data.find((inv: IMontlyExpenditureGroupped) => inv.month === date)
            result.push({
                month: date,
                sum: expenditure?.sum || 0
            })

        }
        return result;

    }

}