import { inject, injectable } from 'tsyringe';
import IExpenditureRepository from '../../expenditure/interfaces/IExpenditureRepository';
import IInvoiceRepository from '../../invoice/interfaces/IInvoiceRepository';
import ISettingsRepository from '../../settings/interfaces/ISettingsRepository';
import { IMeiBillingPercentageData } from '../interfaces/IMeiBillingPercentageData.interface';



@injectable()
export class GetExpenditureByCategory {
    constructor(
        @inject('ExpenditureRepository')
        private expenditureRepository: IExpenditureRepository,

    ) { }

    public async execute(year?: number): Promise<any> {
        if (!year)
            year = new Date().getFullYear();

        const data = this.expenditureRepository.findDataExpenditureByCategoryGraph(year)
        return data;
    }




}