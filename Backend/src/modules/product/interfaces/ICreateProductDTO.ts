export default interface ICreateProductDTO {
    name: string,
    brandProduct: string,
    purchasePrice: number,
    salePrice: number,
    idCompany: number,
    barcode: string,
    details: string,
    idType: string,
    idMeansureUnit: number,
    stockMin:number
}

