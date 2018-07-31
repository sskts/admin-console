"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 会員ルーター
 */
// import * as createDebug from 'debug';
const express = require("express");
const member = require("../controllers/member.controller");
// const debug = createDebug('sskts-admin-console:routes:account');
const memberRouter = express.Router();
memberRouter.get('/search', member.memberSearchRender);
exports.default = memberRouter;
