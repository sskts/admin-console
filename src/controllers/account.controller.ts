/**
 * 口座controller
 */
import * as ssktsapi from '@motionpicture/sskts-api-nodejs-client';
import * as createDebug from 'debug';
import { Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status';

const debug = createDebug('sskts-admin-console:*');

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
    // debug(req.body);
    try {
        depositValidation(req);
        const validationResult = await req.getValidationResult();
        debug(validationResult.mapped());
        if (!validationResult.isEmpty()) {
            res.status(BAD_REQUEST);
            res.json({
                validation: validationResult.mapped(),
                error: new Error('validationResult is not empty').message
            });

            return;
        }
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
        res.json({
            error: null
        });
    } catch (err) {
        res.json({
            validation: null,
            error: err.message
        });
    }
}

/**
 * 入金検証
 */
function depositValidation(req: Request) {
    // 入金受取人情報 id
    req.checkBody('recipient.id', '入金受取人IDは英数字で入力してください').matches(/^[A-Za-z0-9]*$/);
    // 入金受取人情報 name
    req.checkBody('recipient.name', '入金受取人名が未入力です').trim().notEmpty();
    // 入金受取人情報 url
    req.checkBody('recipient.url', '入金受取人URLは英数字で入力してください').trim().matches(/^[A-Za-z0-9]*$/);
    // 入金先口座番号
    req.checkBody('toAccountNumber', '入金先口座番号が未入力です').trim().notEmpty();
    req.checkBody('toAccountNumber', '入金先口座番号は数字で入力してください').matches(/^[0-9]*$/);
    // 入金金額
    req.checkBody('amount', '入金金額が未入力です').trim().notEmpty();
    req.checkBody('amount', '入金金額は数字で入力してください').matches(/^[-]?[0-9]*$/);
}
