import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IInvoiceRepository from '../../invoice/interfaces/IInvoiceRepository';
import IMontlyInvoicesGroupped from '../../invoice/interfaces/IMontlyInvoicesGroupped.interface';



@injectable()
export class GetMontlyInvoices {
    constructor(
        @inject('InvoiceRepository')
        private invoiceRepository: IInvoiceRepository,

    ) { }

    public async execute(grouppedBy = "all", year = new Date().getFullYear()): Promise<any> {

        let dataByPaymentDate: IMontlyInvoicesGroupped[];
        let dataByCompetence: IMontlyInvoicesGroupped[];

        if (grouppedBy === 'competence' || grouppedBy === 'all')
            dataByCompetence = await this.getGrouppedByCompetence(year);
        if (grouppedBy === 'payment' || grouppedBy === 'all')
            dataByPaymentDate = await this.getGrouppedByPaymentDate(year)

        return { dataByCompetence, dataByPaymentDate };
    }

    public async getGrouppedByCompetence(year: number): Promise<IMontlyInvoicesGroupped[]> {
        const data = await this.invoiceRepository.findDataMontlyInvoicesGrouppedByCompetence(year)
        const result = [];
        for (let i = 1; i <= 12; i++) {
            const date = `${i.toString().padStart(2, '0')}/${year}`
            const invoice = data.find((inv: IMontlyInvoicesGroupped) => inv.month === date)
            result.push({
                month: date,
                sum: invoice?.sum || 0
            })

        }
        return result;

    }
    public async getGrouppedByPaymentDate(year: number) {
        const data = await this.invoiceRepository.findDataMontlyInvoicesGrouppedByPaymentDate(year)
        const result = [];
        for (let i = 1; i <= 12; i++) {
            const date = `${i.toString().padStart(2, '0')}/${year}`
            const invoice = data.find((inv: IMontlyInvoicesGroupped) => inv.month === date)
            result.push({
                month: date,
                sum: invoice?.sum || 0
            })

        }
        return result;

    }

}