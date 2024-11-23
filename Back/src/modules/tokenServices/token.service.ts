import { Injectable } from "@nestjs/common";
import { nanoid } from "nanoid";


@Injectable()
export class TokenService {
    constructor() { }
    async generateToken(num: number = 6): Promise<string> {
        return await nanoid(num);
    }

    async checkToken(userToken: string, gardenerToken: string): Promise<boolean> {
        if (userToken === gardenerToken) {
            return true;
        }
        return false;
    }
}