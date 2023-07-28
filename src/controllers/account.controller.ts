/**
 * 口座controller
 */
import * as cinerino from '@cinerino/sdk';
import * as createDebug from 'debug';
import { Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status';

const debug = createDebug('sskts-admin-console:');

/**
 * ポイント付与レンダリング
 */
export async function depositRender(_req: Request, res: Response) {
    res.render('account/deposit');
}

/**
 * ポイント付与
 */
export async function deposit(req: Request, res: Response) {
    debug('body', req.body);
    try {
        depositValidation(req);
        const validationResult = await req.getValidationResult();
        debug(validationResult.mapped());
        if (!validationResult.isEmpty()) {
            res.status(BAD_REQUEST);
            res.json({
                validation: validationResult.mapped(),
                error: new Error('validationResult is not empty').message,
            });

            return;
        }

        const accountService = new cinerino.service.Account({
            endpoint: <string>process.env.API_ENDPOINT,
            auth: req.user.authClient,
            project: { id: <string>process.env.PROJECT_ID },
            seller: {
                id: '',
            },
        });
        const params = req.body;
        await accountService.deposit4sskts(params);
        debug('resolve');
        res.json({
            error: null,
        });
    } catch (error) {
        debug('reject', error);
        const code = error?.code === undefined ? 400 : error?.code;
        res.status(code);
        res.json({
            validation: null,
            error: error.message,
        });
    }
}

/**
 * 入金検証
 */
function depositValidation(req: Request) {
    // 会員コード
    req.checkBody('recipient.id', '会員コードが未入力です').trim().notEmpty();
    req.checkBody('object.toLocation.accountNumber', '会員コードが未入力です')
        .trim()
        .notEmpty();
    // 備考
    req.checkBody('object.description', '備考が未入力です')
        .trim()
        .notEmpty();
    // 受取人名
    req.checkBody('recipient.name', '受取人名が未入力です').trim().notEmpty();

    // 加算ポイント
    req.checkBody('object.amount', '加算ポイントが未入力です')
        .trim()
        .notEmpty();
    req.checkBody('object.amount', '加算ポイントは数字で入力してください')
        .toInt()
        .matches(/^[-]?[0-9]*$/);
}
