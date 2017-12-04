"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hooks = /** @class */ (function () {
    function Hooks() {
        this.hooks = new Array();
    }
    Hooks.prototype.add = function (hook) {
        this.hooks.push(new Hook(hook));
    };
    Hooks.prototype.delete = function (name) {
        var hooks = this.hooks;
        this.hooks.forEach(function (hook, id) {
            if (hook.name == name) {
                delete hooks[id];
            }
        });
    };
    Hooks.prototype.register = function (name, callback) {
        this.hooks.forEach(function (hook) {
            if (hook.name == name) {
                hook.callbacks.push(callback);
            }
        });
    };
    Hooks.prototype.call = function (name, that) {
        this.hooks.forEach(function (hook) {
            if (hook.name == name) {
                hook.trigger(that);
            }
        });
    };
    return Hooks;
}());
exports.Hooks = Hooks;
var Hook = /** @class */ (function () {
    function Hook(name) {
        this.name = name;
        this.callbacks = new Array();
    }
    Hook.prototype.trigger = function (that) {
        this.callbacks.forEach(function (callback) {
            callback(that);
        });
    };
    return Hook;
}());
