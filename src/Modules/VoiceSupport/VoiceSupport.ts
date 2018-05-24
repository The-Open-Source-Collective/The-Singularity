import {Bot} from "../../Bot";
import * as Discord from 'discord.js';

let textToSpeech = require('@google-cloud/text-to-speech');
let Readable = require('stream').Readable;
let ytdl = require('ytdl-core');

export class VoiceSupport {

    public config: any;
    public bot: Bot;

    constructor(bot: Bot, config: any) {
        this.bot = bot;
        this.config = config;

        this.registerHooks();
    }

    registerHooks() {
        let bot = this.bot;
        let irc = bot.irc;
        let discord = bot.discord;

        discord.on("message", (msg: any) => {
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
                        if (discord.client.voiceConnections.first()) {
                            let voice: Discord.VoiceConnection = discord.client.voiceConnections.first();

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
                        if (discord.client.voiceConnections.first()) {
                            let voice: Discord.VoiceConnection = discord.client.voiceConnections.first();

                            // Creates a client
                            const client = new textToSpeech.TextToSpeechClient();
                            const text = args.splice(1);

                            const request = {
                                input: {text: text},
                                voice: {languageCode: 'en-US', ssmlGender: 'FEMALE', name: "en-US-Standard-C"},
                                audioConfig: {audioEncoding: 'OGG_OPUS'},
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
                                //voice.playOpusStream(stream);
                            });
                        } else {
                            msg.reply('please run the `!v init` command first.');
                        }
                        break;

                    case "test":
                        if (discord.client.voiceConnections.first()) {
                            let voice: Discord.VoiceConnection = discord.client.voiceConnections.first();

                            // Creates a client
                            const client = new textToSpeech.TextToSpeechClient();
                            const text = args.splice(1);

                            const request = {
                                input: {text: "This is an example of my voice."},
                                voice: {languageCode: 'en-US', ssmlGender: 'FEMALE', name: args[1]},
                                audioConfig: {audioEncoding: 'OGG_OPUS'},
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
                                //voice.playOpusStream(stream);
                            });
                        } else {
                            msg.reply('please run the `!v init` command first.');
                        }
                        break;


                    case "quit":
                        if (discord.client.voiceConnections.first()) {
                            let voice: Discord.VoiceConnection = discord.client.voiceConnections.first();

                            voice.disconnect();
                        }
                        break;
                }

            }
        });
    }

}