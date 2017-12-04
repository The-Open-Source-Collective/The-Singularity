import irc = require('irc');

export class IRC {

    nick: string;
    ident: string;
    realName: string;

    server: string;
    port: number;
    ssl: boolean;

    connection: any;

    constructor(server: string, port: number, nick: string, ident: string, realName: string) {
        this.server = server;
        this.port = port;

        this.nick = nick;
        this.ident = ident;
        this.realName = realName;

        let options = {
            "userName": this.ident,
            "realName": this.realName,
            "port": this.port,
            "debug": true,
            "showErrors": true,
            "autoRejoin": true,
            "autoConnect": true,
            "secure": false,
            "selfSigned": false,
            "certExpired": false,
            "floodProtection": false,
            "floodProtectionDelay": 1000,
            "sasl": false,
            "retryCount": 0,
            "retryDelay": 2000,
            "stripColors": false,
            "channelPrefixes": "&#",
            "messageSplit": 512,
            "encoding": ""
        };

        this.connection = new irc.Client(this.server, this.nick, options);

        this.connection.addListener('message', function (from:string, to:string, message:string) {
            console.log(from + ' => ' + to + ': ' + message);
        });

    }

    on(event:string, callback:any) {
        this.connection.addListener(event, callback);
    }

    join(channel: string, password: string = "") {
        this.connection.join(channel, null, password)
    }

    msg(dest: string, message: string) {
        this.connection.say(dest, message);
    }
}