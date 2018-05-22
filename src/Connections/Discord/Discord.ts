import * as discord from "discord.js";
import {IConnection} from "../../Interfaces/IConnection";
import {TextChannel} from "./TextChannel";
import {User} from "./User";

export class Discord implements IConnection {

    public id: string;
    public name: string;

    public channels: Array<TextChannel>;
    public users: Array<User>;

    public client: discord.Client;

    token: string;

    constructor(token: string) {
        this.token = token;

        this.client = new discord.Client();
        this.client.login(this.token);
    }

    on(event:string, callback:any) {
        this.client.addListener(event, callback);
    }

    msg(room: string, message: string) {
        this.client.channels.forEach((channel: any) => {
            if (room == channel.name) {
                channel.send(message);
            }
        });
    }

}