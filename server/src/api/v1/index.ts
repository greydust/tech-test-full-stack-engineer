import * as express from 'express';
import * as job from './job';

const router = express.Router();

router.use('/job', job.router);

export { router };