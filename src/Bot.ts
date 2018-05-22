import {Hooks} from "./Hooks";
import {APIServer} from "./APIServer";
import {IRC} from "./Connections/IRC/IRC";
import {Discord} from "./Connections/Discord/Discord";

import fs = require('fs');
import jsonfile = require('jsonfile');
import {VoiceConnection} from "discord.js";

let textToSpeech = require('@google-cloud/text-to-speech');

let Readable = require('stream').Readable;
let ytdl = require('ytdl-core');

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

        /*this.discord.on("message", (msg: any) => {
            if (msg.content == "!v") {
                msg.reply('```\r\n'
                                + '[Voice Support Module]\n'
                                + '!v - I will show you this help message.\n'
                                + '!v init - I will join the voice channel you are in. All other commands will require me being in your voice channel.\n'
                                + '!v say <message> - I will dictate this for you.\n'
                                + '!v play <url> - I will play a mp3 file or YouTube Video, well, the audio only.\n'
                                + '!v quit - Bye, Felica.\n'
                                + '```');
            } else if (msg.content.startsWith("!v ")) {
                let bits = msg.content.split(" ");
                let command = bits[0];
                let args = bits.slice(1);

                switch (args[0]) {
                    case "init":
                        if (msg.member.voiceChannel) {
                            msg.member.voiceChannel.join()
                                .catch((error: any) => {
                                msg.reply("I've made the following mistake: " + error.toString());
                            });
                        } else {
                            msg.reply('please join the channel you want me to join first.');
                        }
                        break;

                    case "play":
                        if (discord.client.client.voice.connections.first()) {
                            let voice: VoiceConnection = discord.connection.voice.connections.first();

                            if (ytdl.validateURL(args[1])) {
                                let stream = ytdl(args[1], {
                                    filter: (format: any) => {
                                        return format.container === 'm4a' && !format.encoding;
                                    }
                                });

                                voice.playStream(stream);
                            } else {
                                voice.playArbitraryInput(args[1]);
                            }
                        } else {
                            msg.reply('please run the `!v init` command first.');
                        }
                        break;

                    case "say":
                        if (discord.connection.voice.connections.first()) {
                            let voice: VoiceConnection = discord.connection.voice.connections.first();

                            // Creates a client
                            const client = new textToSpeech.TextToSpeechClient();
                            const text = args.splice(1);

                            const request = {
                                input: {text: text},
                                voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
                                audioConfig: {audioEncoding: 'MP3'},
                            };

                            client.synthesizeSpeech(request, (err: any, response: any) => {
                                if (err) {
                                    console.error('ERROR:', err);
                                    return;
                                }

                                let stream = new Readable;
                                stream._read = function noop() {};
                                stream.push(response.audioContent);
                                stream.push(null);
                                voice.playStream(stream);
                            });
                        } else {
                            msg.reply('please run the `!v init` command first.');
                        }
                        break;

                    case "quit":
                        if (discord.connection.voice.connections.first()) {
                            let voice: VoiceConnection = discord.connection.voice.connections.first();

                            voice.disconnect();
                        }
                        break;
                }

            }
        });*/


    }

}

let bot = new Bot();