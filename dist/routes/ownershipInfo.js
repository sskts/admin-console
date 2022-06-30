"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 会員ルーター
 */
const express = require("express");
const ownershipInfoRouter = express.Router();
// tslint:disable-next-line:variable-name
ownershipInfoRouter.get('/search', (_req, res) => {
    res.redirect('/');
});
exports.default = ownershipInfoRouter;
