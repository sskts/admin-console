/**
 * Indexルーター
 */
// import * as createDebug from 'debug';
import * as express from 'express';

// const debug = createDebug('sskts-admin-console:routes:index');
const indexRouter = express.Router();

indexRouter.get('/', (_, res: express.Response) => {
    res.redirect('/account/deposit');
});

export default indexRouter;
