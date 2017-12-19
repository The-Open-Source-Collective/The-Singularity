"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
class Discord {
    constructor(token) {
        this.token = token;
        this.connection = new discord.Client();
        this.connection.login(this.token);
    }
}
exports.Discord = Discord;
