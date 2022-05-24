export default interface IUpdateProductDTO {
    id: number,
    name: string,
    brandProduct: string,
    purchasePrice: number,
    salePrice: number,
    barcode: string,
    details: string,
    idMeansureUnit: number,
    stockMin:number
}