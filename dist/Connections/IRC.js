"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var irc = require("irc");
var IRC = /** @class */ (function () {
    function IRC(server, port, nick, ident, realName) {
        this.server = server;
        this.port = port;
        this.nick = nick;
        this.ident = ident;
        this.realName = realName;
        var options = {
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
        this.connection.addListener('message', function (from, to, message) {
            console.log(from + ' => ' + to + ': ' + message);
        });
        var bot = this;
        this.connection.addListener('message', function (from, to, message) {
            if (message == "!test") {
            }
        });
    }
    IRC.prototype.on = function (event, callback) {
        this.connection.addListener(event, callback);
    };
    IRC.prototype.join = function (channel, password) {
        if (password === void 0) { password = ""; }
        this.connection.join(channel, null, password);
    };
    IRC.prototype.msg = function (dest, message) {
        this.connection.say(dest, message);
    };
    return IRC;
}());
exports.IRC = IRC;
