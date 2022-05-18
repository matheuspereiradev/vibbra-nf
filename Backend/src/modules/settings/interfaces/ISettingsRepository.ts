
import { Settings } from "../models/entities/Settings";
import IUpdateSettingsDTO from "./IUpdateSettingsDTO";

export default interface ISettingsRepository {
    find(company:number): Promise<Settings>;
    update(data: IUpdateSettingsDTO): Promise<Settings>;
}