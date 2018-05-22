import {IUser} from "../../Interfaces/IUser";
import * as irc from "irc";

export class User implements IUser {

    public id: string;
    public name: string;

    public client: irc.Client;

    public msg(message: string) {
        this.client.say(this.name, message);
    }

}