"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hooks_1 = require("./Hooks");
const APIServer_1 = require("./APIServer");
const IRC_1 = require("./Connections/IRC");
const Discord_1 = require("./Connections/Discord");
const Ark_1 = require("./Connections/Ark");
const jsonfile = require("jsonfile");
let textToSpeech = require('@google-cloud/text-to-speech');
let Readable = require('stream').Readable;
let LastfmAPI = require('lastfmapi');
let ytdl = require('ytdl-core');
class Bot {
    constructor() {
        this._initConfig();
        this._initHooks();
        this._initAPIServer();
        this._initIRC();
        this._initDiscord();
        this._addCoreHooks();
        this.lastfm = new LastfmAPI(this.config.lastfm);
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
            let channels = this.config.irc.channels;
            channels.forEach((channel) => {
                irc.join(channel);
            });
        });
        this.discord.on('message', (msg) => {
            if (msg.channel.name == "alexa" && msg.author.username != "Alexa") {
                irc.msg("#alexa", "[DISCORD][" + msg.author.username + "] " + msg.content);
            }
        });
        this.irc.on("message", (from, to, message) => {
            if (to == "#alexa" && from != this.config.irc.nick) {
                discord.msg("alexa", "[IRC][" + from + "] " + message);
            }
        });
        this.discord.on("message", (msg) => {
            if (msg.content.startsWith("!np")) {
                let username = msg.content.split(" ")[1];
                this.lastfm.user.getRecentTracks({ "user": username, "limit": 1 }, (error, tracks) => {
                    if (tracks.track[0] !== 'undefined') {
                        let np = tracks.track[0];
                        if (np['@attr'].nowplaying == 'true') {
                            discord.msg(msg.channel.name, "[NP] " + username + " is listening to " + np.name + " by " + np.artist['#text']);
                        }
                    }
                });
            }
        });
        this.discord.on("message", (msg) => {
            if (msg.content == "!v") {
            }
            else if (msg.content.startsWith("!v ")) {
                let bits = msg.content.split(" ");
                let command = bits[0];
                let args = bits.slice(1);
                switch (args[0]) {
                    case "init":
                        if (msg.member.voiceChannel) {
                            msg.member.voiceChannel.join()
                                .catch((error) => {
                                msg.reply("I've made the following mistake: " + error.toString());
                            });
                        }
                        else {
                            msg.reply('please join the channel you want me to join first.');
                        }
                        break;
                    case "play":
                        if (discord.connection.voice.connections.first()) {
                            let voice = discord.connection.voice.connections.first();
                            if (ytdl.validateURL(args[1])) {
                                let stream = ytdl(args[1], {
                                    filter: (format) => {
                                        return format.container === 'm4a' && !format.encoding;
                                    }
                                });
                                voice.playStream(stream);
                            }
                            else {
                                voice.playArbitraryInput(args[1]);
                            }
                        }
                        else {
                            msg.reply('please run the `!v init` command first.');
                        }
                        break;
                    case "say":
                        if (discord.connection.voice.connections.first()) {
                            let voice = discord.connection.voice.connections.first();
                            // Creates a client
                            const client = new textToSpeech.TextToSpeechClient();
                            const text = args.splice(1);
                            const request = {
                                input: { text: text },
                                voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
                                audioConfig: { audioEncoding: 'MP3' },
                            };
                            client.synthesizeSpeech(request, (err, response) => {
                                if (err) {
                                    console.error('ERROR:', err);
                                    return;
                                }
                                let stream = new Readable;
                                stream._read = function noop() { };
                                stream.push(response.audioContent);
                                stream.push(null);
                                voice.playStream(stream);
                            });
                        }
                        else {
                            msg.reply('please run the `!v init` command first.');
                        }
                        break;
                }
            }
        });
        this.irc.on("message", (from, to, message) => {
            if (message.startsWith("!np")) {
                let username = message.split(" ")[1];
                this.lastfm.user.getRecentTracks({ "user": username, "limit": 1 }, (error, tracks) => {
                    if (tracks.track[0] !== 'undefined') {
                        let np = tracks.track[0];
                        if (np['@attr'].nowplaying == 'true') {
                            irc.msg(to, "[NP] " + username + " is listening to " + np.name + " by " + np.artist['#text']);
                        }
                    }
                });
            }
        });
    }
}
exports.Bot = Bot;
let bot = new Bot();
//# sourceMappingURL=Bot.js.map