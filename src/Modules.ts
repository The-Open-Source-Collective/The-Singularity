import fs = require('fs');
import {Bot} from "./Bot";

export class Modules {

    bot: any;
    modules: Array<any>;

    constructor(bot: Bot) {
        this.bot = Bot;

        this._loadModules();
    }

    _loadModules() {
        this.modules = new Array<any>();
        let that = this;
        let bot = this.bot;

        fs.readdir(__dirname + "/Modules/", (error, items) => {
            for (let i=0; i<items.length; i++) {
                let name = items[i].replace(".js", "");
                let module = require(__dirname + "/Modules/" + name + "/" + name);
                let mod = new module[name](bot);

                that.modules.push(mod);
            }
        });
    }



}