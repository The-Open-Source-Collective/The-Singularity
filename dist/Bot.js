"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hooks_1 = require("./Hooks");
var IRC_1 = require("./Connections/IRC");
var Bot = /** @class */ (function () {
    function Bot() {
        var hooks = new Hooks_1.Hooks();
        var irc = new IRC_1.IRC("irc.alphachat.net", 6667, "Alexa", "Alexa", "Alexa IRC AI");
        irc.on("motd", function () {
            irc.join("#ark");
        });
        irc.on("join", function (channel, nick) {
            console.log(channel);
            irc.msg(channel, "I'm here...");
        });
    }
    return Bot;
}());
exports.Bot = Bot;
var bot = new Bot();
