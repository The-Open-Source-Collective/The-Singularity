"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hook = /** @class */ (function () {
    function Hook() {
        this.hooks = new Array();
        this.callbacks = [new Array()];
    }
    Hook.prototype.add = function (hook) {
        this.hooks.push(hook);
        this.callbacks.push();
    };
    Hook.prototype.register = function (hook, callback) {
        var hookID = this.hooks.indexOf(hook);
        this.callbacks[hookID].push(callback);
    };
    Hook.prototype.call = function (hook, that) {
        var hookID = this.hooks.indexOf(hook);
        this.callbacks[hookID].forEach(function (callback) {
            callback(that);
        });
    };
    return Hook;
}());
exports.Hook = Hook;
