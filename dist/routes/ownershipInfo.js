"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 会員ルーター
 */
// import * as createDebug from 'debug';
const express = require("express");
const ownershipInfo = require("../controllers/ownershipInfo.controller");
// const debug = createDebug('sskts-admin-console:routes:account');
const ownershipInfoRouter = express.Router();
ownershipInfoRouter.get('/search', ownershipInfo.ownershipInfoSearchRender);
exports.default = ownershipInfoRouter;
