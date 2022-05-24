import { MeansureUnit } from "../models/entities/MeansureUnit";

export default interface IMeansureUnitRepository {
    findAll(): Promise<Array<MeansureUnit>>;
    findByID(id: number): Promise<MeansureUnit>;
}