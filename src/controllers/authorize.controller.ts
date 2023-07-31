import { Request, Response } from 'express';
import { BAD_REQUEST, OK } from 'http-status';

/**
 * 認証情報取得
 */
export function getCredentials(req: Request, res: Response) {
    const accessToken = req.user.authClient.credentials.access_token;
    const credentials = {
        accessToken
    };
    if (accessToken === undefined) {
        res.status(BAD_REQUEST);
    } else {
        res.status(OK);
    }
    res.json(credentials);
}
