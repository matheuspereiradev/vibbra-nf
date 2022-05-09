
import { Invoice } from "../models/entities/Invoice";
import ICreateInvoiceDTO from "./ICreateInvoiceDTO";
import IUpdateInvoiceDTO from "./IUpdateInvoiceDTO";

export default interface IInvoiceRepository {
    findAll(): Promise<Array<Invoice>>;
    findByID(id: number): Promise<Invoice>;
    findByNumber(nfNumber: string): Promise<Invoice>;
    findByCompetence(competence: string): Promise<Invoice[]>;
    findByCompetenceYear(competenceYear: string): Promise<Invoice[]>;
    findFaturationInYear(year: number): Promise<number>;
    findDataMontlyInvoicesGrouppedByCompetence(year: number): Promise<any>;
    findDataMontlyInvoicesGrouppedByPaymentDate(year: number): Promise<any>;
    create(data: ICreateInvoiceDTO): Promise<Invoice>;
    update(data: IUpdateInvoiceDTO): Promise<Invoice>;
    delete(id: number): Promise<void>;
}