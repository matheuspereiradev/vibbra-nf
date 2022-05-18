import { request, Request, Response } from 'express';
import { container } from 'tsyringe';
import { SettingsRepository } from '../models/repositories/Settings.repository';
import { UpdateSettingsService } from '../services/UpdateSettings.service';

export class SettingsController {

    async find(request: Request, response: Response) {
        const company = request.company;
        const settingsRepository = new SettingsRepository();
        const all = await settingsRepository.find(company.id);
        return response.status(200).json(all);
    }

    async update(request: Request, response: Response) {
        const idCompany = request.company.id;
        const { emailBillingAlerts, maximumAnnualBillingLimit, sendEmailBillingAlerts, notifyFrom } = request.body;
        const updateService = container.resolve(UpdateSettingsService);
        const settings = await updateService.execute({ emailBillingAlerts, maximumAnnualBillingLimit, sendEmailBillingAlerts, notifyFrom , idCompany});
        return response.status(200).json(settings);
    }

};