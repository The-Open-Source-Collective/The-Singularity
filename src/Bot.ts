import {Hooks} from "./Hooks";
import {APIServer} from "./APIServer";
import {Modules} from "./Modules";
import {IRC} from "./Connections/IRC";
import {Discord} from "./Connections/Discord";
import {Ark} from "./Connections/Ark";

import jsonfile = require('jsonfile');

export class Bot {

    hooks: Hooks;
    irc: IRC;
    discord: Discord;
    ark: Ark;
    modules: Modules;
    apiServer: APIServer;

    config: any;

    constructor() {
        this._initConfig();
        this._initHooks();
        this._initAPIServer();

        this._initArk();
        this._initIRC();
        this._initDiscord();

        this._addCoreHooks();
        this._initModules();
    }

    _initConfig() {
        let config = jsonfile.readFileSync(__dirname + "/config.json");

        this.config = config;
    }

    _initHooks() {
        this.hooks = new Hooks();
    }

    _initAPIServer() {
        this.apiServer = new APIServer(this.config.api.port, this);
    }

    _initModules() {
        this.modules = new Modules(this);
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
            let channels = this.config.irc.channels;
            channels.forEach((channel: string) => {
                irc.join(channel);
            });
        });

        this.discord.on('message', (msg: any) => {
           if (msg.channel.name == "alexa" && msg.author.username != "Alexa") {
               irc.msg("#alexa", "[DISCORD]["+msg.author.username+"] " + msg.content);
           }
        });

        this.irc.on("message", (from: string, to: string, message: string) => {
            if (to == "#alexa" && from != this.config.irc.nick) {
                discord.msg("alexa", "[IRC][" + from + "] " + message);
            }
        });
    }

}

let bot = new Bot();