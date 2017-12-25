"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let request = require('request');
class Ark {
    constructor(host, port, password) {
        this.host = host;
        this.port = port;
        this.password = password;
    }
    exec(cmd, responseCallback) {
        let Ark = this;
        request.post('http://' + this.host + ':' + this.port + '/' + cmd, { api_key: Ark.password }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            Ark.responder = responseCallback(body);
        });
    }
}
exports.Ark = Ark;
//# sourceMappingURL=Ark.js.map