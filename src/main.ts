import express from "express"
import router from "./router.js";
//import {mainBot} from "./services/telegram/TelegramAuthBotService.js";
import {mainBot} from "./services/telegram/mainBot.js";


const PORT = 5000;
const app = express()
app.use(express.json())
app.use('/api', router)


async function startApp() {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED'))
        mainBot()
    }
    catch (error) {
        console.log(error)
    }
}



startApp()
