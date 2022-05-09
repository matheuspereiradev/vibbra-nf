import { inject, injectable } from 'tsyringe';
import IInvoiceRepository from '../../invoice/interfaces/IInvoiceRepository';
import ISettingsRepository from '../../settings/interfaces/ISettingsRepository';
import { IMeiBillingPercentageData } from '../interfaces/IMeiBillingPercentageData.interface';



@injectable()
export class GetMeiBillingPercentage {
    constructor(
        @inject('SettingsRepository')
        private settingsRepository: ISettingsRepository,

        @inject('InvoiceRepository')
        private invoiceRepository: IInvoiceRepository,

    ) { }

    public async execute(year?: number): Promise<IMeiBillingPercentageData> {
        if (!year)
            year = new Date().getFullYear();
        const [settings, yearFaturation] = await Promise.all([
            this.settingsRepository.find(),
            this.invoiceRepository.findFaturationInYear(year)
        ]);

        return {
            yearFaturation: Number(yearFaturation),
            maximumAnnualBillingLimit: Number(settings.maximumAnnualBillingLimit)
        }
    }




}