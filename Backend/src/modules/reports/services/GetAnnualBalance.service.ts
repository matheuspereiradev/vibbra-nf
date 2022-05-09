import { inject, injectable } from 'tsyringe';
import IExpenditureRepository from '../../expenditure/interfaces/IExpenditureRepository';
import IInvoiceRepository from '../../invoice/interfaces/IInvoiceRepository';



@injectable()
export class GetAnnualBalance {
    constructor(
        @inject('InvoiceRepository')
        private invoiceRepository: IInvoiceRepository,

        @inject('ExpenditureRepository')
        private expenditureRepository: IExpenditureRepository,
    ) { }

    public async execute(year = new Date().getFullYear()): Promise<any> {

        const annualFaturetion = await this.invoiceRepository.findFaturationInYear(year)
        const annualExpenditure = await this.expenditureRepository.findAnnualExpenses(year)

        return { annualFaturetion, annualExpenditure };
    }

}