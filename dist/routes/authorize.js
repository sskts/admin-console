"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 認証APIルーター
 * @ignore
 */
const express = require("express");
const authorize = require("../controllers/authorize.controller");
const authorizeRouter = express.Router();
authorizeRouter.get('/getCredentials', authorize.getCredentials);
exports.default = authorizeRouter;
