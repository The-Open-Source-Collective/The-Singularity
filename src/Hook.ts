export class Hook {

    hooks: Array<String>;
    callbacks: [Array<any>];

    constructor() {
        this.hooks = new Array<String>();
        this.callbacks = [new Array<any>()];
    }

    add(hook: string) {
        this.hooks.push(hook);
        this.callbacks.push();
    }

    register(hook: string, callback: any) {
        let hookID = this.hooks.indexOf(hook);
        this.callbacks[hookID].push(callback);
    }

    call(hook: string, that: object) {
        let hookID = this.hooks.indexOf(hook);
        this.callbacks[hookID].forEach((callback: any) => {
            callback(that);
        });

    }

}