"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Bot_1 = require("./Bot");
class APIServer {
    constructor(port, bot) {
        this.port = port;
        this.server = express();
        this.server.listen(this.port);
        this.bot = Bot_1.Bot;
        this.server.get('/', (req, res) => {
            bot.irc.msg("#alexa", "testing web api");
        });
    }
}
exports.APIServer = APIServer;
