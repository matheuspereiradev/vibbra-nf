import { inject, injectable } from "tsyringe";
import ISettingsRepository from "../interfaces/ISettingsRepository";
import IUpdateSettingsDTO from "../interfaces/IUpdateSettingsDTO";
import { Settings } from "../models/entities/Settings";

@injectable()
export class UpdateSettingsService {

    constructor(
        @inject("SettingsRepository")
        private repository: ISettingsRepository
    ) { }

    public async execute({ emailBillingAlerts, maximumAnnualBillingLimit, sendEmailBillingAlerts, notifyFrom,idCompany }: IUpdateSettingsDTO): Promise<Settings> {

        const settings = await this.repository.update({
            emailBillingAlerts, maximumAnnualBillingLimit, sendEmailBillingAlerts, notifyFrom,idCompany
        });

        return settings;
    }

};