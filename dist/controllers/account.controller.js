"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 口座controller
 */
const ssktsapi = require("@motionpicture/sskts-api-nodejs-client");
const createDebug = require("debug");
const http_status_1 = require("http-status");
const debug = createDebug('sskts-admin-console:*');
/**
 * ポイント付与レンダリング
 */
function depositRender(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const organizationService = new ssktsapi.service.Organization({
            endpoint: process.env.API_ENDPOINT,
            auth: req.user.authClient
        });
        const movieTheaters = yield organizationService.searchMovieTheaters();
        res.locals.movieTheaters = movieTheaters;
        res.render('account/deposit');
    });
}
exports.depositRender = depositRender;
/**
 * ポイント付与
 */
function deposit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountService = new ssktsapi.service.Account({
            endpoint: process.env.API_ENDPOINT,
            auth: req.user.authClient
        });
        // debug(req.body);
        try {
            depositValidation(req);
            const validationResult = yield req.getValidationResult();
            debug(validationResult.mapped());
            if (!validationResult.isEmpty()) {
                res.status(http_status_1.BAD_REQUEST);
                res.json({
                    validation: validationResult.mapped(),
                    error: new Error('validationResult is not empty').message
                });
                return;
            }
            const args = {
                recipient: {
                    id: req.body.recipient.id,
                    name: req.body.recipient.name,
                    url: req.body.recipient.url
                },
                toAccountNumber: req.body.toAccountNumber,
                amount: Number(req.body.amount),
                notes: req.body.notes
            };
            yield accountService.deposit(args);
            res.json({
                error: null
            });
        }
        catch (err) {
            res.json({
                validation: null,
                error: err.message
            });
        }
    });
}
exports.deposit = deposit;
/**
 * 入金検証
 */
function depositValidation(req) {
    // 入金受取人情報 id
    req.checkBody('recipient.id', '入金受取人IDは英数字で入力してください').matches(/^[A-Za-z0-9]*$/);
    // 入金受取人情報 name
    req.checkBody('recipient.name', '入金受取人名が未入力です').trim().notEmpty();
    // 入金受取人情報 url
    req.checkBody('recipient.url', '入金受取人URLは英数字で入力してください').trim().matches(/^[A-Za-z0-9]*$/);
    // 入金先口座番号
    req.checkBody('toAccountNumber', '入金先口座番号が未入力です').trim().notEmpty();
    req.checkBody('toAccountNumber', '入金先口座番号は数字で入力してください').matches(/^[0-9]*$/);
    // 入金金額
    req.checkBody('amount', '入金金額が未入力です').trim().notEmpty();
    req.checkBody('amount', '入金金額は数字で入力してください').matches(/^[-]?[0-9]*$/);
}
