"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hooks_1 = require("./Hooks");
const APIServer_1 = require("./APIServer");
const Modules_1 = require("./Modules");
const IRC_1 = require("./Connections/IRC");
const Discord_1 = require("./Connections/Discord");
const Ark_1 = require("./Connections/Ark");
const jsonfile = require("jsonfile");
class Bot {
    constructor() {
        this._initConfig();
        this._initHooks();
        this._initAPIServer();
        this._initModules();
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
        this.hooks = new Hooks_1.Hooks();
    }
    _initAPIServer() {
        this.apiServer = new APIServer_1.APIServer(this.config.api.port, this);
    }
    _initModules() {
        this.modules = new Modules_1.Modules(this);
    }
    _initArk() {
        this.ark = new Ark_1.Ark(this.config.ark.host, this.config.ark.port, this.config.ark.password);
    }
    _initIRC() {
        this.irc = new IRC_1.IRC(this.config.irc.host, this.config.irc.port, this.config.irc.nick, this.config.irc.ident, this.config.irc.realname);
        let irc = this.irc;
        let ark = this.ark;
    }
    _initDiscord() {
        this.discord = new Discord_1.Discord(this.config.discord.token);
    }
    _addCoreHooks() {
        let irc = this.irc;
        let ark = this.ark;
        let discord = this.discord;
        this.irc.on("motd", () => {
            irc.join("#ark");
            irc.join("#alexa");
        });
        this.irc.on("message", (from, to, message) => {
            if (to == "#Ark" && message == "!players") {
                ark.exec("ListPlayers", (response) => {
                    irc.msg("#ark", response);
                });
            }
        });
    }
}
exports.Bot = Bot;
let bot = new Bot();
