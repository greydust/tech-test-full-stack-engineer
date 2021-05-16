import express from 'express';
import { Express } from 'express-serve-static-core';
import * as mysql2 from 'mysql2';

import v1ApiRouter from './api/v1';
import DatabaseJob from './library/database/database-job';
import Common from './library/common';

async function main() {
  const server: Express = express();
  const port: number = 8080;

  const pool: mysql2.Pool = mysql2.createPool({
    host: 'database', port: 3306, user: 'root', password: 'hipages', database: 'hipages',
  });
  Common.databaseJob = new DatabaseJob({ mysql: pool.promise() });

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use('/v1', v1ApiRouter);
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening at http://localhost:${port}`);
  });
}

main();
