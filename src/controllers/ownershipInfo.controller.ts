/**
 * 会員controller
 */
import * as cinerino from '@cinerino/api-nodejs-client';
import * as createDebug from 'debug';
import { Request, Response } from 'express';

const debug = createDebug('sskts-admin-console:');

/**
 * 会員検索レンダリング
 */
export async function ownershipInfoSearchRender(req: Request, res: Response) {
    debug('ownershipInfoSearchRender');
    const sellerService = new cinerino.service.Seller({
        endpoint: <string>process.env.API_ENDPOINT,
        auth: req.user.authClient
    });

    const searchResult = await sellerService.search({});
    res.locals.sellers = searchResult.data;
    res.render('ownershipInfo/search');
}
