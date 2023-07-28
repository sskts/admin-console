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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deposit = exports.depositRender = void 0;
/**
 * 口座controller
 */
const cinerino = require("@cinerino/sdk");
const createDebug = require("debug");
const http_status_1 = require("http-status");
const debug = createDebug('sskts-admin-console:');
/**
 * ポイント付与レンダリング
 */
function depositRender(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render('account/deposit');
    });
}
exports.depositRender = depositRender;
/**
 * ポイント付与
 */
function deposit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        debug('body', req.body);
        try {
            depositValidation(req);
            const validationResult = yield req.getValidationResult();
            debug(validationResult.mapped());
            if (!validationResult.isEmpty()) {
                res.status(http_status_1.BAD_REQUEST);
                res.json({
                    validation: validationResult.mapped(),
                    error: new Error('validationResult is not empty').message,
                });
                return;
            }
            const accountService = new cinerino.service.Account({
                endpoint: process.env.API_ENDPOINT,
                auth: req.user.authClient,
                project: { id: process.env.PROJECT_ID },
                seller: {
                    id: '',
                },
            });
            const params = req.body;
            yield accountService.deposit4sskts(params);
            debug('resolve');
            res.json({
                error: null,
            });
        }
        catch (error) {
            debug('reject', error);
            const code = (error === null || error === void 0 ? void 0 : error.code) === undefined ? 400 : error === null || error === void 0 ? void 0 : error.code;
            res.status(code);
            res.json({
                validation: null,
                error: error.message,
            });
        }
    });
}
exports.deposit = deposit;
/**
 * 入金検証
 */
function depositValidation(req) {
    // 会員コード
    req.checkBody('recipient.id', '会員コードが未入力です').trim().notEmpty();
    req.checkBody('object.toLocation.accountNumber', '会員コードが未入力です')
        .trim()
        .notEmpty();
    // 備考
    req.checkBody('object.description', '備考が未入力です')
        .trim()
        .notEmpty();
    // 受取人名
    req.checkBody('recipient.name', '受取人名が未入力です').trim().notEmpty();
    // 加算ポイント
    req.checkBody('object.amount', '加算ポイントが未入力です')
        .trim()
        .notEmpty();
    req.checkBody('object.amount', '加算ポイントは数字で入力してください')
        .toInt()
        .matches(/^[-]?[0-9]*$/);
}
