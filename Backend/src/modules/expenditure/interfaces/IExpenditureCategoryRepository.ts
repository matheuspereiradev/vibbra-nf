import { ExpenditureCategory } from "../models/entities/ExpenditureCategory";
import ICreateExpenditureCategoryDTO from "./ICreateExpenditureCategoryDTO";
import IUpdateExpenditureCategoryDTO from "./IUpdateExpenditureCategoryDTO";

export default interface IExpenditureCategoryRepository {
    findAll(idCompany:number): Promise<Array<ExpenditureCategory>>;
    findByID(idCompany:number,id: number): Promise<ExpenditureCategory>;
    create(data: ICreateExpenditureCategoryDTO): Promise<ExpenditureCategory>;
    update(data: IUpdateExpenditureCategoryDTO): Promise<ExpenditureCategory>;
    delete(id: number): Promise<void>;
}