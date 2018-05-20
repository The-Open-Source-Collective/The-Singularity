"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hooks {
    constructor() {
        this.hooks = new Array();
    }
    add(hook) {
        this.hooks.push(new Hook(hook));
    }
    delete(name) {
        let hooks = this.hooks;
        this.hooks.forEach((hook, id) => {
            if (hook.name == name) {
                delete hooks[id];
            }
        });
    }
    register(name, callback) {
        this.hooks.forEach((hook) => {
            if (hook.name == name) {
                hook.callbacks.push(callback);
            }
        });
    }
    call(name, that) {
        this.hooks.forEach((hook) => {
            if (hook.name == name) {
                hook.trigger(that);
            }
        });
    }
}
exports.Hooks = Hooks;
class Hook {
    constructor(name) {
        this.name = name;
        this.callbacks = new Array();
    }
    trigger(that) {
        this.callbacks.forEach((callback) => {
            callback(that);
        });
    }
}
//# sourceMappingURL=Hooks.js.map