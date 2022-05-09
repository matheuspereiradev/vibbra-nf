import { ExpenditureCategory } from "../models/entities/ExpenditureCategory";
import ICreateExpenditureCategoryDTO from "./ICreateExpenditureCategoryDTO";
import IUpdateExpenditureCategoryDTO from "./IUpdateExpenditureCategoryDTO";

export default interface IExpenditureCategoryRepository {
    findAll(): Promise<Array<ExpenditureCategory>>;
    findByID(id: number): Promise<ExpenditureCategory>;
    create(data: ICreateExpenditureCategoryDTO): Promise<ExpenditureCategory>;
    update(data: IUpdateExpenditureCategoryDTO): Promise<ExpenditureCategory>;
    delete(id: number): Promise<void>;
}