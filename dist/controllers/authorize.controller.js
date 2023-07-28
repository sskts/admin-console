"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentials = void 0;
const http_status_1 = require("http-status");
/**
 * 認証情報取得
 */
function getCredentials(req, res) {
    const accessToken = req.user.authClient.credentials.access_token;
    const credentials = {
        accessToken: accessToken
    };
    if (accessToken === undefined) {
        res.status(http_status_1.BAD_REQUEST);
    }
    else {
        res.status(http_status_1.OK);
    }
    res.json(credentials);
}
exports.getCredentials = getCredentials;
