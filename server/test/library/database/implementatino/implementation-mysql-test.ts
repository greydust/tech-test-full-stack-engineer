import { expect } from 'chai';
import DatabaseJob from '../../../../src/library/database/database-job';
import MockMysqlPool from '../../../mock/mock-mysql-pool';

describe('ImplementationMysql tests', () => {
  const mockSqlPool = new MockMysqlPool();
  const databaseJob = new DatabaseJob({ mysql: mockSqlPool });

  it('test listJobs()', async () => {
    mockSqlPool.clearQueryStrings();
    await databaseJob.listJobs('new', 100, 10);
    const queryStrings: Array<string> = mockSqlPool.getQueryStrings();
    expect(queryStrings.length).to.equal(1);
    expect(queryStrings[0]).to.equal("SELECT jobs.*, suburbs.name as suburbs_name, suburbs.postcode, categories.name as categories_name FROM jobs LEFT JOIN suburbs ON jobs.suburb_id = suburbs.id LEFT JOIN categories on jobs.category_id = categories.id WHERE status = 'new' ORDER BY jobs.id LIMIT 100 OFFSET 10");
  });

  it('test acceptJob()', () => {
    mockSqlPool.clearQueryStrings();
    databaseJob.acceptJob('123456');
    const queryStrings: Array<string> = mockSqlPool.getQueryStrings();
    expect(queryStrings.length).to.equal(1);
    expect(queryStrings[0]).to.match(/UPDATE jobs SET status = 'accepted', update_at = '\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d' WHERE id = 123456 AND status = 'new'/);
  });

  it('test declineJob()', () => {
    mockSqlPool.clearQueryStrings();
    databaseJob.declineJob('123456');
    const queryStrings: Array<string> = mockSqlPool.getQueryStrings();
    expect(queryStrings.length).to.equal(1);
    expect(queryStrings[0]).to.match(/UPDATE jobs SET status = 'declined', update_at = '\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d' WHERE id = 123456 AND status = 'new'/);
  });
});
