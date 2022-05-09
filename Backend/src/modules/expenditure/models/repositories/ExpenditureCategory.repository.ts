
import { getRepository, Repository } from 'typeorm';
import ICreateExpenditureCategoryDTO from '../../interfaces/ICreateExpenditureCategoryDTO';
import IExpenditureCategoryRepository from '../../interfaces/IExpenditureCategoryRepository';
import IUpdateExpenditureCategoryDTO from '../../interfaces/IUpdateExpenditureCategoryDTO';
import { ExpenditureCategory } from '../entities/ExpenditureCategory';

export class ExpenditureCategoryRepository implements IExpenditureCategoryRepository {

    private ormRepository: Repository<ExpenditureCategory>;

    constructor() {
        this.ormRepository = getRepository(ExpenditureCategory)
    }


    public async findByID(id: number): Promise<ExpenditureCategory> {
        const all = await this.ormRepository.findOne({ where: { id } });
        return all;
    };

    public async findAll(): Promise<Array<ExpenditureCategory>> {
        const all = await this.ormRepository.find();
        return all;
    }

    public async create(data: ICreateExpenditureCategoryDTO): Promise<ExpenditureCategory> {
        const expenditure = this.ormRepository.create(data);
        await this.ormRepository.save(expenditure);
        return expenditure;
    }
    public async update({ description, name, id }: IUpdateExpenditureCategoryDTO): Promise<ExpenditureCategory> {
        const expenditure = await this.ormRepository.findOne({ where: { id } });
        Object.assign(expenditure, { name, description });
        await this.ormRepository.save(expenditure);
        return expenditure;
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.softDelete(id);
        return;
    }


};