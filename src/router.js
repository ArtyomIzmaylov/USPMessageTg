"use strict";
exports.__esModule = true;
var MessageController_js_1 = require("./controlers/MessageController.js");
var MessageService_js_1 = require("./services/MessageService.js");
var TelegramMessageService_js_1 = require("./services/telegram/TelegramMessageService.js");
var creds_js_1 = require("./creds.js");
var express_1 = require("express");
var JsonFileService_js_1 = require("./services/json/JsonFileService.js");
var router = express_1["default"].Router();
router.post('/sendMessage', function (req, res) {
    new MessageController_js_1.MessageController(new MessageService_js_1.MessageService(new TelegramMessageService_js_1.TelegramMessageService(creds_js_1.creds, creds_js_1.botConfig, new JsonFileService_js_1.JsonFileService(creds_js_1.sessionFilePath).readStringSession()))).create(req, res);
});
exports["default"] = router;
