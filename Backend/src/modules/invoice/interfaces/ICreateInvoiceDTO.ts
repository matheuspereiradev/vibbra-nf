export default interface ICreateInvoiceDTO {
    amount: number,
    nfNumber: string,
    description: string
    competence: string
    receiptDate: Date
    idCompany: number
}