export default interface ICreateExpenditureDTO {
    amount: number,
    description: string
    competence: string
    paymentDate: Date
    idCompany: number
    idCategory: number,
    idProvider:number
}