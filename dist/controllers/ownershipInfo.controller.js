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
const cinerino = require("@cinerino/sdk");
const createDebug = require("debug");
const debug = createDebug('sskts-admin-console:');
/**
 * 会員検索レンダリング
 */
function ownershipInfoSearchRender(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        debug('ownershipInfoSearchRender');
        const sellerService = new cinerino.service.Seller({
            endpoint: process.env.API_ENDPOINT,
            auth: req.user.authClient,
            project: { id: process.env.PROJECT_ID }
        });
        const searchResult = yield sellerService.search({});
        res.locals.sellers = searchResult.data;
        res.render('ownershipInfo/search');
    });
}
exports.ownershipInfoSearchRender = ownershipInfoSearchRender;
