import { TelegramClient } from "telegram";
import { signInEvents, TelegramInterface } from "./interfaces";

const { StringSession } = require("telegram/sessions");

export class Telegram {
    apiId: number;
    apiHash: string;
    stringSession: string;
    client: TelegramClient;
    constructor(config: TelegramInterface) {
        this.apiId = config.apiId
        this.apiHash = config.apiHash
        this.stringSession = config.stringSession
        this.client = new TelegramClient(new StringSession(this.stringSession), this.apiId, this.apiHash, {
            connectionRetries: 5,
        });
    }
    async signIn(events: signInEvents) {

        await this.client.start({
            phoneNumber: async () => await events.onInputPhoneNumber(),
            phoneCode: async () => await events.onInputPhoneCode(),
            password: async () => await events.onInputPassword(),
            onError: (err) => console.log(new Date(), err)
        });
        console.log('save me', this.client.session.save());
    }
}

