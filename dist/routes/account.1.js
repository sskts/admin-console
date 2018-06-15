"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 口座ルーター
 */
// import * as createDebug from 'debug';
const express = require("express");
const account = require("../controllers/account.controller");
// const debug = createDebug('sskts-admin-console:routes:account');
const accountRouter = express.Router();
accountRouter.get('/deposit', account.depositRender);
accountRouter.post('/deposit', account.deposit);
exports.default = accountRouter;
