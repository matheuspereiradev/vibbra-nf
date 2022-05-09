import { IExpenditureCategory } from "./categoryExpenditure.interface"
import { ICompany } from "./company.interface"

export interface IExpenditure {
    id: number,
    amount: number,
    competence: string,
    created_at: Date,
    description: string,
    paymentDate: Date,
    company: ICompany
    category: IExpenditureCategory
    idCategory: number,
    idCompany: number
}