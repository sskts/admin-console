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
const user_1 = require("../user");
/**
 * サインイン
 * Cognitoからリダイレクトしてくる
 */
function signIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // stateにはイベントオブジェクトとして受け取ったリクエストボディが入っている
            const user = new user_1.default({
                host: req.hostname,
                session: req.session
            });
            yield user.signIn(req.query.code);
            res.redirect('/');
        }
        catch (error) {
            next(error);
        }
    });
}
exports.signIn = signIn;
/**
 * ログアウト
 */
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = new user_1.default({
                host: req.hostname,
                session: req.session
            });
            user.logout();
            res.redirect('/');
        }
        catch (error) {
            next(error);
        }
    });
}
exports.logout = logout;
