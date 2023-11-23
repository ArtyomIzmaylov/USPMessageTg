import {PayloadInterface} from "../interfaces/HttpInterfaces.js";
import {TelegramMessageService} from "./telegram/TelegramMessageService.js";

export class MessageService {
    private telegramMessageService: TelegramMessageService;
    constructor(telegramMessageService : TelegramMessageService) {
        this.telegramMessageService = telegramMessageService
    }
    async create(data : PayloadInterface) : Promise<void>{
        await this.telegramMessageService.sendMessage(data)
    }
}
