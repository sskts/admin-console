/**
 * 会員ルーター
 */
// import * as createDebug from 'debug';
import * as express from 'express';
import * as member from '../controllers/member.controller';

// const debug = createDebug('sskts-admin-console:routes:account');
const memberRouter = express.Router();

memberRouter.get('/search', member.memberSearchRender);

export default memberRouter;
