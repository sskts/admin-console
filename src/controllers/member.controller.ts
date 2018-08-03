/**
 * 会員controller
 */
import * as ssktsapi from '@motionpicture/sskts-api-nodejs-client';
import * as createDebug from 'debug';
import { Request, Response } from 'express';

const debug = createDebug('sskts-admin-console:');

/**
 * 会員検索レンダリング
 */
export async function memberSearchRender(req: Request, res: Response) {
    debug('memberSearchRender');
    const organizationService = new ssktsapi.service.Organization({
        endpoint: <string>process.env.API_ENDPOINT,
        auth: req.user.authClient
    });
    const movieTheaters = await organizationService.searchMovieTheaters();
    res.locals.movieTheaters = movieTheaters[0];
    res.render('member/search');
}
