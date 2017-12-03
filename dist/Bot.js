"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hook_1 = require("./Hook");
var Bot = /** @class */ (function () {
    function Bot() {
        var hooks = new Hook_1.Hook();
        hooks.add("test");
        hooks.register("test", this.testHook);
        hooks.call("test", this);
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
