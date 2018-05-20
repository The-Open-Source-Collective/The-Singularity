"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
class Discord {
    constructor(token) {
        this.token = token;
        this.connection = new discord.Client();
        this.connection.login(this.token);
    }
    on(event, callback) {
        this.connection.addListener(event, callback);
    }
    msg(room, message) {
        this.connection.channels.forEach((channel) => {
            if (room == channel.name) {
                channel.sendMessage(message);
            }
        });
    }
}
exports.Discord = Discord;
//# sourceMappingURL=Discord.js.map