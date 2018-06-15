"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ルーター
 */
const express = require("express");
const authentication_1 = require("../middlewares/authentication");
const account_1 = require("./account");
const auth_1 = require("./auth");
const index_1 = require("./index");
const router = express.Router();
// middleware that is specific to this router
// router.use((req, res, next) => {
//   debug('Time: ', Date.now())
//   next()
// })
router.use(auth_1.default);
router.use(authentication_1.default);
router.use(index_1.default);
router.use('/account', account_1.default);
exports.default = router;
