import {IUser} from "./IUser";
import {ITextChannel} from "./ITextChannel";

export interface IConnection {

    id: string;
    name: string;

    client: any;

    channels: Array<ITextChannel>;
    users: Array<IUser>;

}