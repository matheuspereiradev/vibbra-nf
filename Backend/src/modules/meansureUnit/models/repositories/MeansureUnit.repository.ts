
import { getRepository, Repository } from 'typeorm';
import IMeansureUnitRepository from '../../interfaces/IMeansureUnitRepository';
import { MeansureUnit } from '../entities/MeansureUnit';

export class MeansureUnitRepository implements IMeansureUnitRepository {

    private ormRepository: Repository<MeansureUnit>;

    constructor() {
        this.ormRepository = getRepository(MeansureUnit)
    }

    public async findByID(id: number): Promise<MeansureUnit> {
        const all = await this.ormRepository.findOne({ where: { id } });
        return all;
    };

    public async findAll(): Promise<Array<MeansureUnit>> {
        const all = await this.ormRepository.find();
        return all;
    }
};