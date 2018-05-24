import {Hooks} from "./Hooks";
import {APIServer} from "./APIServer";
import {IRC} from "./Connections/IRC/IRC";
import {Discord} from "./Connections/Discord/Discord";

import fs = require('fs');
import jsonfile = require('jsonfile');


export class Bot {

    hooks: Hooks;
    irc: IRC;
    discord: Discord;
    apiServer: APIServer;
    modules: Array<object>;

    config: any;

    constructor() {
        this._initConfig();
        this._initHooks();
        this._initAPIServer();

        this._initIRC();
        this._initDiscord();

        this._addCoreHooks();
        this._initModules();
    }

    private _initConfig() {
        let config = jsonfile.readFileSync(__dirname + "/config.json");

        this.config = config;
    }

    private _initHooks() {
        this.hooks = new Hooks();
    }

    private _initAPIServer() {
        this.apiServer = new APIServer(this.config.api.port, this);
    }

    private _initIRC() {
        this.irc = new IRC(this.config.irc.host, this.config.irc.port, this.config.irc.nick, this.config.irc.ident, this.config.irc.realname);
        let irc = this.irc;
    }

    private _initDiscord() {
        this.discord = new Discord(this.config.discord.token);
    }

    private _initModules() {
        const bot = this;
        let modules = this.modules || new Array<object>();

        fs.readdir(__dirname + "/Modules/", (error, items) => {
            for (let i=0; i<items.length; i++) {
                let name = items[i].replace(".js", "");
                let module = require(__dirname + "/Modules/" + name + "/" + name);
                let configContents = fs.readFileSync(__dirname + "/Modules/" + name + "/" + "/config.json");
                let config = configContents.toJSON();
                let mod = new module[name](bot, config);

                modules.push(mod);
            }
        });
    }

    private _addCoreHooks() {
        let irc = this.irc;
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