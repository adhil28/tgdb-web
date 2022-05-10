import { TelegramClient, Api } from "telegram";
import { getStringSession } from "../Components/Auth/AuthUtils";
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

        if (config.stringSession == null) { this.stringSession = "" }
        else { this.stringSession = config.stringSession }


        this.client = new TelegramClient(new StringSession(this.stringSession), this.apiId, this.apiHash, {});
    }
    async signIn(events: signInEvents) {
        return new Promise(async (resolve) => {
            await this.client.start({
                phoneNumber() {
                    return events.onInputPhoneNumber()
                },
                phoneCode(isCodeViaApp?) {
                    return events.onInputPhoneCode()
                },
                password(hint?) {
                    return events.onInputPassword()
                },
                onError(err) {
                    console.error(new Error(err.message));
                },
            })
            localStorage.setItem('token', getStringSession(this.client.session.save()))
            resolve('done')
        })
    }
    async getAccountDetails() {
        const result = 'name'
        return result
    }
}

