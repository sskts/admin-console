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
        try {
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
            res.json();
        }
        catch (err) {
            res.json({
                message: err.message,
                error: JSON.stringify(err)
            });
        }
    });
}
exports.deposit = deposit;
