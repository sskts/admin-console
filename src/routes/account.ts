/**
 * 口座ルーター
 */
// import * as createDebug from 'debug';
import * as express from 'express';
import * as account from '../controllers/account.controller';

// const debug = createDebug('sskts-admin-console:routes:account');
const accountRouter = express.Router();

accountRouter.get('/deposit', account.depositRender);
accountRouter.post('/deposit', account.deposit);

export default accountRouter;
