export class Hooks {

    hooks: Array<Hook>;

    constructor() {
        this.hooks = new Array<Hook>();
    }

    add(hook: string) {
        this.hooks.push(new Hook(hook));
    }

    delete(name: string) {
        let hooks = this.hooks;
        this.hooks.forEach((hook, id) => {
            if (hook.name == name) {
                delete hooks[id];
            }
        });
    }

    register(name: string, callback: any) {
        this.hooks.forEach((hook) => {
            if (hook.name == name) {
                hook.callbacks.push(callback);
            }
        });
    }

    call(name: string, that: any) {
        this.hooks.forEach((hook) => {
            if (hook.name == name) {
                hook.trigger(that);
            }
        });
    }

}

class Hook {

    name: string;
    callbacks: Array<any>;

    constructor(name: string) {
        this.name = name;
        this.callbacks = new Array<any>();
    }

    trigger(that: any) {
        this.callbacks.forEach((callback) => {
            callback(that);
        });
    }

}