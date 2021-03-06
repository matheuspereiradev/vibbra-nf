import { Expenditure } from "../models/entities/Expenditure";
import ICreateExpenditureDTO from "./ICreateExpenditureDTO";
import IMontlyExpenditureGroupped from "./IMontlyExpenditureGroupped.interface";
import IUpdateExpenditureDTO from "./IUpdateExpenditureDTO";

export default interface IExpenditureRepository {
    findAll(): Promise<Array<Expenditure>>;
    findByID(id: number): Promise<Expenditure>;
    findByCompetence(competence: string): Promise<Expenditure[]>;
    findByCompetenceYear(competenceYear: string): Promise<Expenditure[]>;
    findDataExpenditureByCategoryGraph(year: number): Promise<any>;
    findAnnualExpenses(year: number): Promise<number>;
    findDataMontlyExpenditureGrouppedByCompetence(year: number): Promise<IMontlyExpenditureGroupped[]>;
    findDataMontlyExpenditureGrouppedByPaymentDate(year: number): Promise<IMontlyExpenditureGroupped[]>;
    create(data: ICreateExpenditureDTO): Promise<Expenditure>;
    update(data: IUpdateExpenditureDTO): Promise<Expenditure>;
    delete(id: number): Promise<void>;
}