import {IUser} from "./IUser";

export interface ITextChannel {

    client: any;

    id: string;
    name: string;
    topic: string;

    users: Array<IUser>;

    msg(message: string): void;

}