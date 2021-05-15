import * as express from 'express';

import { Common } from '../../../library/common';

const router = express.Router();

async function getJobsByStatus(request, response) {
  const { status, limit = 20, offset = 10 } = request.query;
  return response.json({
    jobs: await Common.databaseJob.listJobs(status, limit, offset),
  });
}

async function postToJobId(request, response) {
  const { operation } = request.body;
  const { id } = request.params;
  let success = true;
  switch (operation) {
    case 'accept':
      await Common.databaseJob.acceptJob(id);
      break;
    case 'decline':
      await Common.databaseJob.declineJob(id);
      break;
    default:
      success = false;
      break;
  }
  return response.json({
    success,
    operation,
    id,
  })
}

router.get('/', getJobsByStatus)
router.post('/:id', postToJobId);

export { router };