import { Company } from "../models/entities/Company";
import ICreateCompanyDTO from "./ICreateCompanyDTO";
import IUpdateCompanyDTO from "./IUpdateCompanyDTO";

export default interface ICompanyRepository {
    findAll(): Promise<Array<Company>>;
    findByID(id: number): Promise<Company>;
    findByCNPJ(cnpj: string): Promise<Company>;
    create(data: ICreateCompanyDTO): Promise<Company>;
    update(data: IUpdateCompanyDTO): Promise<Company>;
    delete(id: number): Promise<void>;
}