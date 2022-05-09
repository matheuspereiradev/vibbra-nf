export default interface IUpdateExpenditureDTO {
    id: number,
    amount: number,
    description: string
    competence: string
    paymentDate: Date
    idCompany: number
    idCategory: number
}