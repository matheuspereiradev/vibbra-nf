import { User } from "../models/entities/User";
import ICreateUserDTO from "./ICreateUserDTO";
import IUpdateUserDTO from "./IUpdateUserDTO";

export default interface IUserRepository {
    findAll(): Promise<Array<User>>;
    findByID(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(data: ICreateUserDTO): Promise<User>;
    update(data: IUpdateUserDTO): Promise<User>;
    delete(id: number): Promise<void>;
}