import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import ISendMail from '../../../shared/providers/mail/model/ISendMail';
import ICompanyRepository from '../../company/interfaces/ICompanyRepository';
import ISettingsRepository from '../../settings/interfaces/ISettingsRepository';
import ICreateInvoiceDTO from '../interfaces/ICreateInvoiceDTO';
import IInvoiceRepository from '../interfaces/IInvoiceRepository';
import { Invoice } from '../models/entities/Invoice';

@injectable()
export class CreateInvoiceService {

    constructor(
        @inject('InvoiceRepository')
        private repository: IInvoiceRepository,

        @inject('SettingsRepository')
        private settingsRepository: ISettingsRepository,

        @inject('CompanyRepository')
        private companyRepository: ICompanyRepository,

        @inject('SendMail')
        private mailProvider: ISendMail,

    ) { }

    public async execute({ amount, competence, description, idCompany, nfNumber, receiptDate }: ICreateInvoiceDTO): Promise<Invoice> {

        await this.validateCompany(idCompany);
        await this.validateNfNumber(nfNumber);

        const invoice = await this.repository.create({
            amount, competence, description, idCompany, nfNumber, receiptDate
        });

        await this.sendAlert(idCompany);

        return invoice;
    }

    public async sendAlert(idCompany:number) {

        const [settings, yearFaturation] = await Promise.all([
            this.settingsRepository.find(idCompany),
            this.repository.findFaturationInYear(new Date().getFullYear())
        ]);
        const percentage = Math.ceil((100 * yearFaturation) / settings.maximumAnnualBillingLimit);

        if (!settings.sendEmailBillingAlerts || (settings.sendEmailBillingAlerts && percentage < settings.notifyFrom))
            return;

        const variables = {
            percentage,
            annualLimit: settings.maximumAnnualBillingLimit,
        };

        console.log(this.mailProvider.sendEmail(settings.emailBillingAlerts, 'Alerta de limite', variables, 'meiLimitAlert.hbs'));
    }

    public async validateCompany(idCompany: number): Promise<void> {
        const company = await this.companyRepository.findByID(idCompany);

        if (!company) {
            throw new AppError('Company not found', 400);
        }
    }

    public async validateNfNumber(nfNumber: string): Promise<void> {
        const invoice = await this.repository.findByNumber(nfNumber);

        if (invoice) {
            throw new AppError('Invoice already is created', 409);
        }
    }
};