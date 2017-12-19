declare module 'rcon' {
    import { EventEmitter } from "events";
    enum PacketType {
        COMMAND = 0x02,
        AUTH = 0x03,
        RESPONSE_VALUE = 0x00,
        RESPONSE_AUTH = 0x02
    }
    class Rcon extends EventEmitter {
        constructor(
            host: string, port: number, password: string,
            options?: {
                tcp?: boolean,
                challenge?: boolean,
                id?: number
            });
        send(data: string, cmd?: PacketType, id?: number): void;
        connect(): void;
        disconnect(): void;
        setTimeout(timeout: number, callback: () => void): void;
    }
    export = Rcon;
}