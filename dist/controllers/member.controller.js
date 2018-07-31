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
 * 会員controller
 */
const ssktsapi = require("@motionpicture/sskts-api-nodejs-client");
const createDebug = require("debug");
const debug = createDebug('sskts-admin-console:');
/**
 * 会員検索レンダリング
 */
function memberSearchRender(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        debug('memberSearchRender');
        const organizationService = new ssktsapi.service.Organization({
            endpoint: process.env.API_ENDPOINT,
            auth: req.user.authClient
        });
        const movieTheaters = yield organizationService.searchMovieTheaters();
        res.locals.movieTheaters = movieTheaters;
        res.render('member/search');
    });
}
exports.memberSearchRender = memberSearchRender;
