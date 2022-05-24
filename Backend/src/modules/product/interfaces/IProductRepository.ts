import { Product } from "../models/entities/Product";
import ICreateProductDTO from "./ICreateProductDTO";
import IUpdateProductDTO from "./IUpdateProductDTO";

export default interface IProductRepository {
    findAll(idCompany:number, types?:string[]): Promise<Array<Product>>;
    findByID(id: number,idCompany:number): Promise<Product>;
    create(data: ICreateProductDTO): Promise<Product>;
    update(data: IUpdateProductDTO): Promise<Product>;
    delete(id: number): Promise<void>;
}