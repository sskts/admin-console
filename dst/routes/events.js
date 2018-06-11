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
 * イベントルーター
 */
const ssktsapi = require("@motionpicture/sskts-api-nodejs-client");
const createDebug = require("debug");
const express = require("express");
const moment = require("moment");
// import redisClient from '../redis';
const debug = createDebug('sskts-console:routes:events');
const eventsRouter = express.Router();
/**
 * 上映イベント検索
 */
eventsRouter.get('/individualScreeningEvent', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        debug('req.query:', req.query);
        const eventService = new ssktsapi.service.Event({
            endpoint: process.env.API_ENDPOINT,
            auth: req.user.authClient
        });
        const organizationService = new ssktsapi.service.Organization({
            endpoint: process.env.API_ENDPOINT,
            auth: req.user.authClient
        });
        const movieTheaters = yield organizationService.searchMovieTheaters({});
        const searchConditions = Object.assign({ superEventLocationIdentifiers: movieTheaters.map((m) => m.identifier), startFrom: (req.query.startRange !== undefined) ? req.query.startRange.split(' - ')[0] : new Date(), startThrough: (req.query.startRange !== undefined) ? req.query.startRange.split(' - ')[1] : moment().add(1, 'day').toDate() }, req.query);
        debug('searching events...', searchConditions);
        const events = yield eventService.searchIndividualScreeningEvent(searchConditions
        // name?: string;
        // startFrom?: Date;
        // startThrough?: Date;
        // endFrom?: Date;
        // endThrough?: Date;
        // eventStatuses?: EventStatusType[];
        // superEventLocationIdentifiers?: string[];
        // workPerformedIdentifiers?: string[];
        );
        debug(events.length, 'events found.', events);
        res.render('events/individualScreeningEvent/index', {
            movieTheaters: movieTheaters,
            searchConditions: searchConditions,
            events: events
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = eventsRouter;
