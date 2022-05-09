
import { getRepository, ILike, Repository } from 'typeorm';
import ISettingsRepository from '../../interfaces/ISettingsRepository';
import IUpdateSettingsDTO from '../../interfaces/IUpdateSettingsDTO';
import { Settings } from '../entities/Settings';

export class SettingsRepository implements ISettingsRepository {

    private ormRepository: Repository<Settings>;

    constructor() {
        this.ormRepository = getRepository(Settings)
    }

    public async find(): Promise<Settings> {
        const settings = await this.ormRepository.find({ take: 1 });
        return settings[0];
    }

    public async update({ emailBillingAlerts, maximumAnnualBillingLimit, sendEmailBillingAlerts, notifyFrom }: IUpdateSettingsDTO): Promise<Settings> {
        const result = await this.ormRepository.find({ take: 1 });
        const settings = result[0];
        Object.assign(settings, { emailBillingAlerts, maximumAnnualBillingLimit, sendEmailBillingAlerts, notifyFrom });
        await this.ormRepository.save(settings);
        return settings;
    }

};