import {MessageService} from "../services/MessageService.js";
import {Request, Response} from "express";
import {PayloadInterface} from "../interfaces/HttpInterfaces.js";
import {calculateHMAC, secretKet} from "../crypto";




export class MessageController {
    private readonly messageService: MessageService;
    constructor(messageService : MessageService) {
        this.messageService = messageService
    }
    async create(req : Request, res : Response) : Promise<void> {
        console.log(req.body)
        try {
            const hmacMessage: string = calculateHMAC(req.body.message, secretKet);
            const hmacPhone: string = calculateHMAC(req.body.phone, secretKet   );
            if (hmacMessage !== req.body.hmacMessage || hmacPhone !== req.body.hmacPhone) {
                res.status(500).json({ error: 'Хэш не совпадает' });
            } else {
                const data: PayloadInterface = {
                    phone: req.body.phone,
                    message: req.body.message
                };
                console.log(data);
                const post = await this.messageService.create(data);
                res.json(post);
            }
        }
        catch (e) {
            //console.log(e)
            res.status(500).json(e)
        }
    }
}
