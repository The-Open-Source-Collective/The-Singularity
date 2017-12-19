let Rcon = require('Rcon');

export class Ark {

    host: string;
    port: number;
    password: string;

    connection: any;

    responder: any;

    constructor(host: string, port: number, password: string) {
        this.host = host;
        this.port = port;
        this.password = password;

        this.connection = new Rcon(this.host, this.port, this.password, {});
        let Ark = this;

        setTimeout(() => {
            console.log("TIMROUT!");
            Ark.exec("ListPlayers", (players: string) => {
                console.log("OMG");
                console.log(players);
            });
        }, 5000);

        this.connection.on('auth', function() {
            console.log("Authed!");
        }).on('response', function(str: string) {
            if (Ark.responder) {
                //console.log("Got response: " + str);
                Ark.responder(str);
                delete Ark.responder;
            } else {
                console.log("Got UNHANDLED response: " + str);
            }
        }).on('end', function() {
            console.log("Socket closed!");
        }).on('error', function(error: any) {
            Ark.connection.send("getchat");
        }).on('connect', function() {
            console.log("Connected!");

        });

        this.connection.connect();


    }

    exec(cmd: string, responseCallback: any) {
        this.connection.send(cmd);
        this.responder = responseCallback;
    }

}