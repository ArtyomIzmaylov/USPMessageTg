
import {MessageController} from "./controlers/MessageController.js";
import {MessageService} from "./services/MessageService.js";
import {TelegramMessageService} from "./services/telegram/TelegramMessageService.js";
import {botConfig, creds, sessionFilePath} from "./creds.js";
import express, {Router} from "express";
import {JsonFileService} from "./services/json/JsonFileService.js";



const router: Router = express.Router();


router.post('/sendMessage', (req, res) => {
    new MessageController(new MessageService(new TelegramMessageService(creds, botConfig, new JsonFileService(sessionFilePath).readStringSession()))).create(req,res)
})

export default router
