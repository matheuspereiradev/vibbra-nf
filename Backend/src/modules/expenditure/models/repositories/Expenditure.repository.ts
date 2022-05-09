
import { createQueryBuilder, getRepository, ILike, Repository } from 'typeorm';
import ICreateExpenditureDTO from '../../interfaces/ICreateExpenditureDTO';
import IExpenditureRepository from '../../interfaces/IExpenditureRepository';
import IMontlyExpenditureGroupped from '../../interfaces/IMontlyExpenditureGroupped.interface';
import IUpdateExpenditureDTO from '../../interfaces/IUpdateExpenditureDTO';
import { Expenditure } from '../entities/Expenditure';
import { ExpenditureCategory } from '../entities/ExpenditureCategory';

export class ExpenditureRepository implements IExpenditureRepository {

    private ormRepository: Repository<Expenditure>;

    constructor() {
        this.ormRepository = getRepository(Expenditure)
    }

    public async findByCompetence(competence: string): Promise<Expenditure[]> {
        const all = await this.ormRepository.find({ relations: ['company', 'category'], where: { competence } });
        return all;
    }
    public async findByCompetenceYear(competenceYear: string): Promise<Expenditure[]> {
        const all = await this.ormRepository.find({ relations: ['company', 'category'], where: { competence: ILike(`%/${competenceYear}`) } });
        return all;
    }

    public async findDataExpenditureByCategoryGraph(year: number): Promise<any> {
        //TODO: replace for an query builder
        // const data = await this.ormRepository.createQueryBuilder("exp")
        //     // .select("category.*")
        //     .addSelect("SUM(exp.amount)", "sum")
        //     .innerJoin("exp.category", "category")
        //     .groupBy("category.id,category.name")
        //     // .where("exp.competence like :year", { year: `%${year}` })
        //     .getMany()
        //this select get the sum of amounth groupped by category 
        const data = await this.ormRepository.query(
            `SELECT category.id,
                category.name, 
                SUM(exp.amount) AS sum 
            FROM tb_expenditure exp 
            INNER JOIN tb_expenditure_category category ON category.id=exp.id_category AND (category.deleted_at IS NULL) 
            WHERE ( exp.competence like '%/${year}' ) 
                AND (exp.deleted_at IS NULL) 
            GROUP BY category.id,category.name`);

        return data;
    };
    public async findDataMontlyExpenditureGrouppedByCompetence(year: number): Promise<IMontlyExpenditureGroupped[]> {

        const data = await this.ormRepository.query(
            `SELECT exp.competence AS month , 
                SUM(exp.amount) AS sum 
            FROM tb_expenditure exp 
            WHERE ( exp.competence like '%/${year}' ) 
                AND (exp.deleted_at IS NULL) 
            GROUP BY exp.competence`);
        return data;
    };
    public async findDataMontlyExpenditureGrouppedByPaymentDate(year: number): Promise<IMontlyExpenditureGroupped[]> {
        const data = await this.ormRepository.query(
            `SELECT CONCAT(SUBSTRING(exp.payment_date,6,2),'/',SUBSTRING(exp.payment_date,1,4)) AS month, 
                SUM(exp.amount) AS sum 
            FROM tb_expenditure exp 
            WHERE ( exp.payment_date like '${year}-%' ) 
                AND (exp.deleted_at IS NULL) 
            GROUP BY SUBSTRING(exp.payment_date,1,7)`);
        return data;
    };

    public async findAnnualExpenses(year: number): Promise<number> {
        const { sum } = await this.ormRepository
            .createQueryBuilder("Expenditures")
            .select("SUM(Expenditures.amount)", "sum")
            .where("Expenditures.competence like :year", { year: `%${year}` })
            .getRawOne();

        return sum || 0;
    }

    public async findByID(id: number): Promise<Expenditure> {
        const all = await this.ormRepository.findOne({ relations: ['company', 'category'], where: { id } });
        return all;
    };

    public async findAll(): Promise<Array<Expenditure>> {
        const all = await this.ormRepository.find({ relations: ['company', 'category'] });
        return all;
    }

    public async create(data: ICreateExpenditureDTO): Promise<Expenditure> {
        const expenditure = this.ormRepository.create(data);
        await this.ormRepository.save(expenditure);
        return expenditure;
    }
    public async update({ amount, competence, description, idCompany, idCategory, paymentDate, id }: IUpdateExpenditureDTO): Promise<Expenditure> {
        const expenditure = await this.ormRepository.findOne({ where: { id } });
        Object.assign(expenditure, { amount, competence, description, idCompany, paymentDate });
        await this.ormRepository.save(expenditure);
        return expenditure;
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.softDelete(id);
        return;
    }


};