import {Bot} from "../../Bot";
let LastfmAPI = require('lastfmapi');

export class NowPlaying {

    public config: any;
    public bot: Bot;

    lastfm: any;

    constructor(bot: Bot, config: any) {
        this.bot = bot;
        this.config = config;

        this.lastfm = new LastfmAPI(bot.config.lastfm);

        this.registerHooks();
    }

    registerHooks() {
        let bot = this.bot;
        let irc = bot.irc;
        let discord = bot.discord;

        this.bot.discord.on("message", (msg: any) => {
            if (msg.content.startsWith("!np")) {

                let username = msg.content.split(" ")[1];
                this.lastfm.user.getRecentTracks({"user": username, "limit": 1}, (error: any, tracks: any) => {

                    if (tracks !== 'undefined' && tracks.track[0] !== 'undefined') {
                        let np = tracks.track[0];
                        if (np['@attr'].nowplaying == 'true') {
                            discord.msg(msg.channel.name, "[NP] " + username + " is listening to " + np.name + " by " + np.artist['#text']);
                        }
                    }

                });
            }
        });

        this.bot.irc.on("message", (from: string, to: string, message: string) => {

            if (message.startsWith("!np")) {
                let username = message.split(" ")[1];
                this.lastfm.user.getRecentTracks({user: username, "limit": 1}, (error: any, tracks: any) => {
                    if (tracks !== 'undefined' && tracks.track[0] !== 'undefined') {
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