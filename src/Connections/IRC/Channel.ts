import {ITextChannel} from "../../Interfaces/ITextChannel";
import {IUser} from "../../Interfaces/IUser";
import * as irc from "irc";

export class Channel implements ITextChannel {
    client: irc.Client;

    public id: string;
    public name: string;
    public topic: string;

    public users: Array<IUser>;

    constructor(client: any, id: string, name: string) {
        this.id = id;
        this.name = name;
        this.client = client;
    }

    public msg(message: string) {
        this.client.say(this.id, message);
    }

}