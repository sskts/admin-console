/**
 * 会員ルーター
 */
// import * as createDebug from 'debug';
import * as express from 'express';
import * as ownershipInfo from '../controllers/ownershipInfo.controller';

// const debug = createDebug('sskts-admin-console:routes:account');
const ownershipInfoRouter = express.Router();

ownershipInfoRouter.get('/search', ownershipInfo.ownershipInfoSearchRender);

export default ownershipInfoRouter;
