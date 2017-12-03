"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hooks_1 = require("./Hooks");
var Bot = /** @class */ (function () {
    function Bot() {
        var hooks = new Hooks_1.Hooks();
        hooks.add("test");
        console.log(hooks);
        hooks.delete("test");
        console.log(hooks);
    }
    Bot.prototype.testHook = function (that) {
        console.log("testing hook");
        that.test();
    };
    Bot.prototype.test = function () {
        console.log("inceprion");
    };
    return Bot;
}());
exports.Bot = Bot;
var bot = new Bot();
