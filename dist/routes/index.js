"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Indexルーター
 */
// import * as createDebug from 'debug';
const express = require("express");
// const debug = createDebug('sskts-admin-console:routes:index');
const indexRouter = express.Router();
indexRouter.get('/', (_, res) => {
    res.redirect('/account/deposit');
});
exports.default = indexRouter;
