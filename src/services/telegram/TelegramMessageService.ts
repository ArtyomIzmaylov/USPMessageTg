import {Api, TelegramClient} from "telegram/index.js";
import {CredsInterface, PayloadInterface} from "../../interfaces/HttpInterfaces.js";
import {StringSession} from "telegram/sessions/index.js";




export class TelegramMessageService {
    private readonly stringSession: string;
    private botConfig: any;
    constructor(private readonly creds : any, botConfig : any, stringSession : string) {
        this.creds = creds
        this.botConfig = botConfig
        this.stringSession = stringSession
    }

    public async sendMessage(payload: PayloadInterface): Promise<void> {
        try {
            const { apiId, apiHash } = this.creds;
            const stringSession = new StringSession(this.stringSession)
            const client = new TelegramClient(stringSession, apiId, apiHash, {
                connectionRetries: 5,
            });
            const { phone, message } = payload;
            await client.connect();
            const contactName = await client.invoke(
                new Api.contacts.ResolvePhone({
                    phone: phone,
                })
            );
            if (contactName.users && contactName.users.length > 0 && 'username' in contactName.users[0]) {
                await client.invoke(
                    new Api.contacts.AddContact({
                        id: contactName.users[0].username,
                        phone: phone,
                        firstName: contactName.users[0].username,
                        lastName: "",
                        addPhonePrivacyException: true,
                    })
                );
            }
            const entity = await client.getEntity(`+${phone}`);
            await client.invoke(new Api.messages.SendMessage({
                peer: entity,
                message: message,
            }));
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
                if (error.message == 'Not a valid string' || error.message == '401: SESSION_REVOKED (caused by contacts.ResolvePhone)') {
                    fetch(`https://api.telegram.org/bot${this.botConfig.botToken}/sendMessage`,{
                        method : 'post',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body : JSON.stringify({
                            chat_id: this.botConfig.botRecipient,
                            text: this.botConfig.botMessage,
                        })
                    })
                }
            }

        }
    }
}
