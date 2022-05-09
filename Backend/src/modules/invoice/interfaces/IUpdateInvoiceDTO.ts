export default interface IUpdateInvoiceDTO {
    id: number,
    amount: number,
    nfNumber: string,
    description: string
    competence: string
    receiptDate: Date
    idCompany: number
}