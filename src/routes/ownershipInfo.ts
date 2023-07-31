/**
 * 会員ルーター
 */
import * as express from 'express';

const ownershipInfoRouter = express.Router();

// tslint:disable-next-line:variable-name
ownershipInfoRouter.get('/search', (_req, res) => {
    res.redirect('/');
});

export default ownershipInfoRouter;
