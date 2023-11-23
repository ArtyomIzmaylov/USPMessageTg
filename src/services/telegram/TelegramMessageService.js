"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TelegramMessageService = void 0;
var index_js_1 = require("telegram/index.js");
var index_js_2 = require("telegram/sessions/index.js");
var TelegramMessageService = /** @class */ (function () {
    function TelegramMessageService(creds, botConfig, stringSession) {
        this.creds = creds;
        this.creds = creds;
        this.botConfig = botConfig;
        this.stringSession = stringSession;
    }
    TelegramMessageService.prototype.sendMessage = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, apiId, apiHash, stringSession, client, phone, message, contactName, entity, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        _a = this.creds, apiId = _a.apiId, apiHash = _a.apiHash;
                        stringSession = new index_js_2.StringSession(this.stringSession);
                        client = new index_js_1.TelegramClient(stringSession, apiId, apiHash, {
                            connectionRetries: 5
                        });
                        phone = payload.phone, message = payload.message;
                        return [4 /*yield*/, client.connect()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, client.invoke(new index_js_1.Api.contacts.ResolvePhone({
                                phone: phone
                            }))];
                    case 2:
                        contactName = _b.sent();
                        if (!(contactName.users && contactName.users.length > 0 && 'username' in contactName.users[0])) return [3 /*break*/, 4];
                        return [4 /*yield*/, client.invoke(new index_js_1.Api.contacts.AddContact({
                                id: contactName.users[0].username,
                                phone: phone,
                                firstName: contactName.users[0].username,
                                lastName: "",
                                addPhonePrivacyException: true
                            }))];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [4 /*yield*/, client.getEntity("+".concat(phone))];
                    case 5:
                        entity = _b.sent();
                        return [4 /*yield*/, client.invoke(new index_js_1.Api.messages.SendMessage({
                                peer: entity,
                                message: message
                            }))];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        if (error_1 instanceof Error) {
                            console.log(error_1.message);
                            if (error_1.message == 'Not a valid string' || error_1.message == '401: SESSION_REVOKED (caused by contacts.ResolvePhone)') {
                                fetch("https://api.telegram.org/bot".concat(this.botConfig.botToken, "/sendMessage"), {
                                    method: 'post',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        chat_id: this.botConfig.botRecipient,
                                        text: this.botConfig.botMessage
                                    })
                                });
                            }
                        }
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return TelegramMessageService;
}());
exports.TelegramMessageService = TelegramMessageService;
