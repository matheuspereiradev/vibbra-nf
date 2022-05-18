import { User } from "../models/entities/User";
import ICreateUserDTO from "./ICreateUserDTO";
import IUpdateUserDTO from "./IUpdateUserDTO";

export default interface IUserRepository {
    findAll(idCompany:number): Promise<Array<User>>;
    findByID(id: number,idCompany:number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findOwner(idCompany: number): Promise<User>;
    create(data: ICreateUserDTO): Promise<User>;
    setOwner(idUser: number,idCompany: number,isOwner:boolean): Promise<User>;
    update(data: IUpdateUserDTO): Promise<User>;
    removeCompanyFromUsers(company:number): Promise<void>;
    delete(id: number): Promise<void>;
}