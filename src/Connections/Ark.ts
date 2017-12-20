let request = require('request');

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
    }

    exec(cmd: string, responseCallback: any) {
        let Ark = this;
        request.post('http://'+this.host+':'+this.port+'/'+cmd, { api_key: Ark.password }, (err: any, res: any, body: any) => {
            if (err) { return console.log(err); }
            console.log(body.url);
            console.log(body.explanation);

            Ark.responder = responseCallback(body);
        });
    }

}