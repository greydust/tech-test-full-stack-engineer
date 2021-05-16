import * as express from 'express';
import jobRouter from './job';

const router = express.Router();

router.use('/job', jobRouter);

export default router;
