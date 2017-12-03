import {Hook} from "./Hook";

export class Bot {

    constructor() {
        let hooks = new Hook();
        hooks.add("test");
        hooks.register("test", this.testHook);
        hooks.call("test", this);
    }

    testHook(that: any) {
        console.log("testing hook");
        that.test();
    }

    test() {
        console.log("inceprion");
    }
}

let bot = new Bot();