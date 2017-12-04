import {Hooks} from "./Hooks";
import {IRC} from "./Connections/IRC";

export class Bot {

    constructor() {
        let hooks = new Hooks();
        let irc = new IRC("irc.alphachat.net", 6667, "Alexa", "Alexa", "Alexa IRC AI");

        irc.on("motd", () => {
            irc.join("#ark");
        });

        irc.on("join", (channel: string, nick: string) => {
        });
    }

}

let bot = new Bot();