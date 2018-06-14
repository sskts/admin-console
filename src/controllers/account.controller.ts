/**
 * 口座controller
 */
import * as ssktsapi from '@motionpicture/sskts-api-nodejs-client';
import { Request, Response } from 'express';

/**
 * ポイント付与レンダリング
 */
export async function depositRender(req: Request, res: Response) {
    const organizationService = new ssktsapi.service.Organization({
        endpoint: <string>process.env.API_ENDPOINT,
        auth: req.user.authClient
    });
    const movieTheaters = await organizationService.searchMovieTheaters();
    res.locals.movieTheaters = movieTheaters;
    res.render('account/deposit');
}

/**
 * ポイント付与
 */
export async function deposit(req: Request, res: Response) {
    const accountService = new ssktsapi.service.Account({
        endpoint: <string>process.env.API_ENDPOINT,
        auth: req.user.authClient
    });
    try {
        const args = {
            recipient: {
                id: req.body.recipient.id,
                name: req.body.recipient.name,
                url: req.body.recipient.url
            },
            toAccountNumber: req.body.toAccountNumber,
            amount: Number(req.body.amount),
            notes: req.body.notes
        };
        await accountService.deposit(args);
        res.json();
    } catch (err) {
        res.json({
            message: err.message,
            error: JSON.stringify(err)
        });
    }
}
