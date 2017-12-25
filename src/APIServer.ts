import express = require('express');
import bodyParser = require("body-parser");
import {Bot} from "./Bot";

export class APIServer {
    bot: any;

    port: number;

    server: any;

    constructor(port: number, bot: Bot) {
        this.port = port;
        this.server = express();
        this.server.listen(this.port);

        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(bodyParser.json());

        this.bot = Bot;
        this.server.post('/github', (req: any, res: any) => {
            bot.irc.msg("#alexa", "[GITHUB] new push on " + req.body.repository.name + "/" + req.body.ref.replace('refs/heads/', "") + " by " + req.body.pusher.name + " " + req.body.compare);
            bot.discord.msg("alexa", "[GITHUB] new push on " + req.body.repository.name + "/" + req.body.ref.replace('refs/heads/', "") + " by " + req.body.pusher.name + " " + req.body.compare);
        });
    }

}