
import { getRepository, ILike, Repository } from 'typeorm';
import ISettingsRepository from '../../interfaces/ISettingsRepository';
import IUpdateSettingsDTO from '../../interfaces/IUpdateSettingsDTO';
import { Settings } from '../entities/Settings';

export class SettingsRepository implements ISettingsRepository {

    private ormRepository: Repository<Settings>;

    constructor() {
        this.ormRepository = getRepository(Settings)
    }

    public async find(idCompany:number): Promise<Settings> {
        const settings = await this.ormRepository.findOne({ where:{ idCompany} });
        return settings;
    }

    public async update({ emailBillingAlerts, maximumAnnualBillingLimit, sendEmailBillingAlerts, notifyFrom, idCompany }: IUpdateSettingsDTO): Promise<Settings> {
        const settings = await this.ormRepository.findOne({ where:{idCompany}});
        Object.assign(settings, { emailBillingAlerts, maximumAnnualBillingLimit, sendEmailBillingAlerts, notifyFrom });
        await this.ormRepository.save(settings);
        return settings;
    }

};