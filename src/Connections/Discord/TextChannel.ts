import {ITextChannel} from "../../Interfaces/ITextChannel";
import * as User from "./User";
import * as discord from "discord.js";

export class TextChannel implements ITextChannel {

    public id: string;
    public name: string;
    public topic: string;

    public users: Array<User.User>;

    public client: discord.Client;

    constructor() {

    }

    public msg(message: string) {

    }

}