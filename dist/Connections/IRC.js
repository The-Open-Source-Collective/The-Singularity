"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const irc = require("irc");
class IRC {
    constructor(server, port, nick, ident, realName) {
        this.server = server;
        this.port = port;
        this.nick = nick;
        this.ident = ident;
        this.realName = realName;
        let options = {
            "userName": this.ident,
            "realName": this.realName,
            "port": this.port,
            "debug": true,
            "showErrors": true,
            "autoRejoin": true,
            "autoConnect": true,
            "secure": false,
            "selfSigned": false,
            "certExpired": false,
            "floodProtection": false,
            "floodProtectionDelay": 1000,
            "sasl": false,
            "retryCount": 0,
            "retryDelay": 2000,
            "stripColors": false,
            "channelPrefixes": "&#",
            "messageSplit": 512,
            "encoding": ""
        };
        this.connection = new irc.Client(this.server, this.nick, options);
    }
    on(event, callback) {
        this.connection.addListener(event, callback);
    }
    join(channel, password = "") {
        this.connection.join(channel, null, password);
    }
    msg(dest, message) {
        if (message) {
            this.connection.say(dest, message);
        }
    }
}
exports.IRC = IRC;
//# sourceMappingURL=IRC.js.map