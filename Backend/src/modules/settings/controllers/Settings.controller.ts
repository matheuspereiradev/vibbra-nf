import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SettingsRepository } from '../models/repositories/Settings.repository';
import { UpdateSettingsService } from '../services/UpdateSettings.service';

export class SettingsController {

    async show(_request: Request, response: Response) {
        const invoiceRepository = new SettingsRepository();
        const all = await invoiceRepository.find();
        return response.status(200).json(all);
    }

    async update(request: Request, response: Response) {
        const { emailBillingAlerts, maximumAnnualBillingLimit, sendEmailBillingAlerts, notifyFrom } = request.body;
        const updateService = container.resolve(UpdateSettingsService);
        const settings = await updateService.execute({ emailBillingAlerts, maximumAnnualBillingLimit, sendEmailBillingAlerts, notifyFrom });
        return response.status(200).json(settings);
    }

};