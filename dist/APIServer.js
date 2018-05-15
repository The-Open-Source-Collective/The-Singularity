"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const Bot_1 = require("./Bot");
class APIServer {
    constructor(port, bot) {
        this.port = port;
        this.server = express();
        this.server.listen(this.port);
        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(bodyParser.json());
        this.bot = Bot_1.Bot;
        this.server.post('/github', (req, res) => {
            bot.irc.msg("#alexa", "[GITHUB] new push on " + req.body.repository.name + "/" + req.body.ref.replace('refs/heads/', "") + " by " + req.body.pusher.name + " " + req.body.compare);
            bot.discord.msg("alexa", "[GITHUB] new push on " + req.body.repository.name + "/" + req.body.ref.replace('refs/heads/', "") + " by " + req.body.pusher.name + " " + req.body.compare);
        });
    }
}
exports.APIServer = APIServer;
//# sourceMappingURL=APIServer.js.map