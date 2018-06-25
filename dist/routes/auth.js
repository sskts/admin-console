"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 認証ルーター
 * @ignore
 */
const express = require("express");
const auth = require("../controllers/auth.controller");
const authRouter = express.Router();
authRouter.get('/signIn', auth.signIn);
authRouter.get('/logout', auth.logout);
exports.default = authRouter;
