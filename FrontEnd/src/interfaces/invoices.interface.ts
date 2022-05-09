import { ICompany } from "./company.interface";

export interface IInvoice {
    id: number,
    amount: number,
    competence: string,
    created_at: Date,
    description: string,
    receiptDate: Date,
    nfNumber: string,
    idCompany: number,
    company: ICompany
}