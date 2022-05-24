import { ProductType } from "../models/entities/ProductType";

export default interface IProductTypeRepository {
    findAll(): Promise<Array<ProductType>>;
    findByID(id: number): Promise<ProductType>;
}