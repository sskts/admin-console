"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * テストルーター
 */
// import * as ssktsapi from '@motionpicture/sskts-api-nodejs-client';
const createDebug = require("debug");
const express = require("express");
// import * as moment from 'moment';
const debug = createDebug('sskts-admin-console:routes:test');
const testRouter = express.Router();
/**
 * TEST
 */
testRouter.get('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        debug('req.query', req.query);
        res.render('test', {
            layout: false
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = testRouter;
