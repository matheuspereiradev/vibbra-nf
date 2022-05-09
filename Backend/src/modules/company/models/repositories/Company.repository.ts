
import { getRepository, Repository } from 'typeorm';
import ICompanyRepository from '../../interfaces/ICompanyRepository';
import ICreateCompanyDTO from '../../interfaces/ICreateCompanyDTO';
import IUpdateCompanyDTO from '../../interfaces/IUpdateCompanyDTO';
import { Company } from '../entities/Company';

export class CompanyRepository implements ICompanyRepository {

    private ormRepository: Repository<Company>;

    constructor() {
        this.ormRepository = getRepository(Company)
    }


    public async findByID(id: number): Promise<Company> {
        const all = await this.ormRepository.findOne({ where: { id } });
        return all;
    };
    public async findByCNPJ(cnpj: string): Promise<Company> {
        const all = await this.ormRepository.findOne({ where: { cnpj } });
        return all;
    };

    public async findAll(): Promise<Array<Company>> {
        const all = await this.ormRepository.find();
        return all;
    }

    public async create(data: ICreateCompanyDTO): Promise<Company> {
        const company = this.ormRepository.create(data);
        await this.ormRepository.save(company);
        return company;
    }
    public async update({ name, cnpj, corporateName, id }: IUpdateCompanyDTO): Promise<Company> {
        const company = await this.ormRepository.findOne({ where: { id } });
        Object.assign(company, { name, cnpj, corporateName });
        await this.ormRepository.save(company);
        return company;
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.softDelete(id);
        return;
    }


};