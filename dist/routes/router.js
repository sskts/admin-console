"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ルーター
 */
const express = require("express");
const _1 = require(".");
const authentication_1 = require("../middlewares/authentication");
const account_1 = require("./account");
const auth_1 = require("./auth");
const authorize_1 = require("./authorize");
const ownershipInfo_1 = require("./ownershipInfo");
const router = express.Router();
// middleware that is specific to this router
// router.use((req, res, next) => {
//   debug('Time: ', Date.now())
//   next()
// })
router.use(auth_1.default);
router.use(authentication_1.default);
router.use(_1.default);
router.use('/api/authorize', authorize_1.default);
router.use('/account', account_1.default);
router.use('/ownershipInfo', ownershipInfo_1.default);
exports.default = router;
