/**
 * 認証ルーター
 * @ignore
 */
import * as express from 'express';
import * as auth from '../controllers/auth.controller';
const authRouter = express.Router();

authRouter.get('/signIn', auth.signIn);
authRouter.get('/logout', auth.logout);

export default authRouter;
