import { Provider } from "../models/entities/Provider";
import ICreateProviderDTO from "./ICreateProviderDTO";
import IUpdateProviderDTO from "./IUpdateProviderDTO";

export default interface IProviderRepository {
    findAll(idCompany:number): Promise<Array<Provider>>;
    findByID(id: number,idCompany:number): Promise<Provider>;
    create(data: ICreateProviderDTO): Promise<Provider>;
    update(data: IUpdateProviderDTO): Promise<Provider>;
    delete(id: number): Promise<void>;
}