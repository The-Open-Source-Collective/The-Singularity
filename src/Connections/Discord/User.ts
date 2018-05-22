import * as discord from "discord.js";
import {IUser} from "../../Interfaces/IUser";

export class User implements IUser {
    client: discord.Client;

    id: string;
    name: string;

    msg(message: string) {

    }
}