"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Bot_1 = require("./Bot");
class Modules {
    constructor(bot) {
        this.bot = Bot_1.Bot;
        this._loadModules();
    }
    _loadModules() {
        this.modules = new Array();
        let that = this;
        let bot = this.bot;
        fs.readdir(__dirname + "/Modules/", (error, items) => {
            for (let i = 0; i < items.length; i++) {
                let name = items[i].replace(".js", "");
                let module = require(__dirname + "/Modules/" + name + "/" + name);
                let mod = new module[name](bot);
                that.modules.push(mod);
            }
        });
    }
}
exports.Modules = Modules;
//# sourceMappingURL=Modules.js.map