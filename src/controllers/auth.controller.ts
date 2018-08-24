/**
 * 認証コントローラー
 */
import { NextFunction, Request, Response } from 'express';
import User from '../user';

/**
 * サインイン
 * Cognitoからリダイレクトしてくる
 */
export async function signIn(req: Request, res: Response, next: NextFunction) {
    try {
        // stateにはイベントオブジェクトとして受け取ったリクエストボディが入っている
        const user = new User({
            host: req.hostname,
            session: <Express.Session>req.session
        });

        await user.signIn(req.query.code);
        res.redirect('/');
    } catch (error) {
        next(error);
    }
}

/**
 * ログアウト
 */
export async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User({
            host: req.hostname,
            session: <Express.Session>req.session
        });
        user.logout();
        res.redirect('/');
    } catch (error) {
        next(error);
    }
}
