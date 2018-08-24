/**
 * ルーター
 */
import * as express from 'express';
import indexRouter from '.';
import authentication from '../middlewares/authentication';
import accountRouter from './account';
import authRouter from './auth';
import authorizeRouter from './authorize';
import ownershipInfoRouter from './ownershipInfo';

const router = express.Router();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   debug('Time: ', Date.now())
//   next()
// })

router.use(authRouter);

router.use(authentication);
router.use(indexRouter);
router.use('/api/authorize', authorizeRouter);
router.use('/account', accountRouter);
router.use('/ownershipInfo', ownershipInfoRouter);

export default router;
