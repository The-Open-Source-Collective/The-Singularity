export interface IUser {

    client: any;

    id: string;
    name: string;

    msg(message: string): void;

}