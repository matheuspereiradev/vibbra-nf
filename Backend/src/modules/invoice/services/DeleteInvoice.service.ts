import { inject, injectable } from 'tsyringe';
import IInvoiceRepository from '../interfaces/IInvoiceRepository';


@injectable()
export class DeleteInvoiceService {
    constructor(
        @inject('InvoiceRepository')
        private repository: IInvoiceRepository
    ) { }

    public async execute(id: number): Promise<void> {
        await this.repository.delete(id);
    }


}