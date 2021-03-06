import IHashProvider from "../models/IHashProvider";
import { compare, hash } from "bcryptjs";

export default class BCryptHashProvider implements IHashProvider {

    public async genarateHash(seed: string): Promise<string> {
        if (seed !== "")
            return hash(seed, 8);
        else
            return ""
    }

    public async compareHash(text: string, hashedString: string): Promise<boolean> {
        return compare(text, hashedString);
    }
};
