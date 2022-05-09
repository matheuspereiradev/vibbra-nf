import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import ICompanyRepository from '../../company/interfaces/ICompanyRepository';
import ICreateInvoiceDTO from '../interfaces/ICreateInvoiceDTO';
import IInvoiceRepository from '../interfaces/IInvoiceRepository';
import IUpdateInvoiceDTO from '../interfaces/IUpdateInvoiceDTO';
import { Invoice } from '../models/entities/Invoice';

@injectable()
export class UpdateInvoiceService {

    constructor(
        @inject('InvoiceRepository')
        private repository: IInvoiceRepository,

        @inject('CompanyRepository')
        private companyRepository: ICompanyRepository

    ) { }

    public async execute({ id, amount, competence, description, idCompany, nfNumber, receiptDate }: IUpdateInvoiceDTO): Promise<Invoice> {

        await this.validateCompany(idCompany);
        await this.validateNfNumber(nfNumber, id);

        const invoice = await this.repository.update({
            id, amount, competence, description, idCompany, nfNumber, receiptDate
        });

        return invoice;
    }

    public async validateCompany(idCompany: number): Promise<void> {
        const company = await this.companyRepository.findByID(idCompany);

        if (!company) {
            throw new AppError('Company not found', 400);
        }
    }

    public async validateNfNumber(nfNumber: string, id: number): Promise<void> {
        const invoice = await this.repository.findByNumber(nfNumber);

        if (invoice && id !== invoice.id) {
            throw new AppError('Number of invoice already in use', 409);
        }
    }
};