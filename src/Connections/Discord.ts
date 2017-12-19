import discord = require('discord.js');

export class Discord {

    token: string;

    connection: any;

    constructor(token: string) {
        this.token = token;

        this.connection = new discord.Client();
        this.connection.login(this.token);
    }

}