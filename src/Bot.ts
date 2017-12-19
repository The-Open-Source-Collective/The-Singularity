import {Hooks} from "./Hooks";
import {IRC} from "./Connections/IRC";
import {Discord} from "./Connections/Discord";
import {Ark} from "./Connections/Ark";

import jsonfile = require('jsonfile');

export class Bot {

    hooks: Hooks;
    irc: IRC;
    discord: Discord;
    ark: Ark;

    config: any;

    constructor() {
        this._initConfig();
        this._initHooks();
        this._initArk();
        this._initIRC();
        this._initDiscord();

        this._addCoreHooks();

    }

    _initConfig() {
        let config = jsonfile.readFileSync(__dirname + "/config.json");

        this.config = config;
    }

    _initHooks() {
        this.hooks = new Hooks();
    }

    _initArk() {
        this.ark = new Ark(this.config.ark.host, this.config.ark.port, this.config.ark.password);
    }

    _initIRC() {
        this.irc = new IRC(this.config.irc.host, this.config.irc.port, this.config.irc.nick, this.config.irc.ident, this.config.irc.realname);
        let irc = this.irc;
        let ark = this.ark;

    }

    _initDiscord() {
        this.discord = new Discord(this.config.discord.token);
    }

    _addCoreHooks() {
        let irc = this.irc;
        let ark = this.ark;
        let discord = this.discord;

        this.irc.on("motd", () => {
            irc.join("#ark");
            irc.join("#alexa");
        });

        this.irc.on("message", (from: string, to: string, message: string) => {
            if (to == "#Ark" && message == "!players") {
                ark.exec("ListPlayers", (response: string) => {
                    irc.msg("#ark", response);
                });
            }
        });
    }

}

let bot = new Bot();