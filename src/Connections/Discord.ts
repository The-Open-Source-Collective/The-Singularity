import discord = require('discord.js');

export class Discord {

    token: string;

    connection: any;

    constructor(token: string) {
        this.token = token;

        this.connection = new discord.Client();
        this.connection.login(this.token);
    }

    on(event:string, callback:any) {
        this.connection.addListener(event, callback);
    }

    msg(room: string, message: string) {
        this.connection.channels.forEach((channel: discord.TextChannel) => {
            if (room == channel.name) {
                channel.sendMessage(message);
            }
        });
    }

}