import {Bot} from "../../Bot";
import discordjs = require("discord.js");

export class Test {

    public config: any;
    public bot: Bot;

    constructor(bot: Bot, config: any) {
        this.bot = bot;
        this.config = config;

    }

    registerHooks() {
        this.bot.discord.on("message", (msg: discordjs.Message) => {
            if (msg.content == "!test") {
                msg.reply("Ohhhhh mygod.");
                msg.acknowledge();
                msg.react(":)");
            }
        });

        this.bot.irc.on("message", (from: string, to: string, message: string) => {
            if (message == "!test") {
                this.bot.irc.msg(to, "TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEST");
            }
        });

    }

}