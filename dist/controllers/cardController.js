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
import * as cardService from '../services/createCardService.js';
import * as activateCardService from '../services/activateCardService.js';
import * as employeeCardsService from '../services/employeeCardsService.js';
import * as cardRechargeService from '../services/cardRechargeService.js';
import * as cardPaymentService from '../services/cardPaymentService.js';
import * as cardBlockService from '../services/cardBlockService.js';
import * as cardBalanceService from '../services/cardBalanceService.js';
export function createCard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, _a, cardType, employeeId, card, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    apiKey = req.headers['x-api-key'];
                    _a = req.body, cardType = _a.cardType, employeeId = _a.employeeId;
                    if (!apiKey) {
                        return [2 /*return*/, res.status(401).send('No API key provided')];
                    }
                    if (!cardType || !employeeId) {
                        return [2 /*return*/, res.status(400).send('Missing required fields')];
                    }
                    return [4 /*yield*/, cardService.createCard(apiKey, cardType, employeeId)];
                case 1:
                    card = _b.sent();
                    res.status(201).send(card);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.log(error_1);
                    res.status(500).send('Internal server error');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
;
export function activateCard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, cardId, securityCode, password, updatedCard, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, cardId = _a.id, securityCode = _a.securityCode, password = _a.password;
                    if (!cardId || !securityCode || !password) {
                        return [2 /*return*/, res.status(400).send('Missing required fields')];
                    }
                    return [4 /*yield*/, activateCardService.activateCard(cardId, securityCode, password)];
                case 1:
                    updatedCard = _b.sent();
                    res.status(200).send(updatedCard);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    console.log(error_2);
                    res.status(500).send('Internal server error');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function visualizateCards(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, employeeId, cardPassword, employeeCards, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, employeeId = _a.employeeId, cardPassword = _a.cardPassword;
                    if (!employeeId || !cardPassword) {
                        return [2 /*return*/, res.status(400).send('Missing required fields')];
                    }
                    if (cardPassword.length < 4) {
                        return [2 /*return*/, res.status(400).send('Password must be at least 4 characters long')];
                    }
                    return [4 /*yield*/, employeeCardsService.getEmployeeCards(employeeId, cardPassword)];
                case 1:
                    employeeCards = _b.sent();
                    res.status(200).send(employeeCards);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    console.log(error_3);
                    res.status(500).send('Internal server error');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function visualizateCardsBalance(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cardId, balance, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    cardId = req.body.cardId;
                    if (!cardId) {
                        return [2 /*return*/, res.status(400).send('Missing required fields')];
                    }
                    return [4 /*yield*/, cardBalanceService.cardBalance(cardId)];
                case 1:
                    balance = _a.sent();
                    res.status(200).send(balance);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    res.status(500).send('Internal server error');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function rechargeCards(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, _a, cardId, rechargeAmount, recharge, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    apiKey = req.headers["x-api-key"];
                    _a = req.body, cardId = _a.cardId, rechargeAmount = _a.rechargeAmount;
                    if (!apiKey) {
                        return [2 /*return*/, res.status(401).send('No API key provided')];
                    }
                    if (!cardId || !rechargeAmount) {
                        return [2 /*return*/, res.status(400).send('Missing required fields')];
                    }
                    return [4 /*yield*/, cardRechargeService.rechargeCards(apiKey, cardId, rechargeAmount)];
                case 1:
                    recharge = _b.sent();
                    res.status(200).send(recharge);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _b.sent();
                    console.log(error_5);
                    res.status(500).send('Internal server error');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function paymentCard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, cardId, cardPassword, businessesId, amount, payment, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, cardId = _a.cardId, cardPassword = _a.cardPassword, businessesId = _a.businessesId, amount = _a.amount;
                    if (!cardId || !cardPassword || !businessesId || !amount) {
                        return [2 /*return*/, res.status(400).send('Missing required fields')];
                    }
                    return [4 /*yield*/, cardPaymentService.paymentCard({ cardId: cardId, cardPassword: cardPassword, businessesId: businessesId, amount: amount })];
                case 1:
                    payment = _b.sent();
                    res.status(200).send(payment);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _b.sent();
                    console.log(error_6);
                    res.status(500).send('Internal server error');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function blockCard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, cardId, cardPassword, card, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, cardId = _a.cardId, cardPassword = _a.cardPassword;
                    if (!cardId || !cardPassword) {
                        return [2 /*return*/, res.status(400).send('Missing required fields')];
                    }
                    return [4 /*yield*/, cardBlockService.blockCard({ cardId: cardId, cardPassword: cardPassword })];
                case 1:
                    card = _b.sent();
                    res.status(200).send(card);
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _b.sent();
                    console.log(error_7);
                    res.status(500).send('Internal server error');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function unlockCard(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, cardId, cardPassword, card, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, cardId = _a.cardId, cardPassword = _a.cardPassword;
                    if (!cardId || !cardPassword) {
                        return [2 /*return*/, res.status(400).send('Missing required fields')];
                    }
                    return [4 /*yield*/, cardBlockService.unlockCard({ cardId: cardId, cardPassword: cardPassword })];
                case 1:
                    card = _b.sent();
                    res.status(200).send(card);
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _b.sent();
                    console.log(error_8);
                    res.status(500).send('Internal server error');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
