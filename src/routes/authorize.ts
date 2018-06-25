/**
 * 認証APIルーター
 * @ignore
 */
import * as express from 'express';
import * as authorize from '../controllers/authorize.controller';
const authorizeRouter = express.Router();

authorizeRouter.get('/getCredentials', authorize.getCredentials);

export default authorizeRouter;
