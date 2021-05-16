import { expect } from 'chai';

import Common from '../../../../src/library/common';
import DatabaseJob from '../../../../src/library/database/database-job';
import MockMysqlPool from '../../../mock/mock-mysql-pool';

const rewire = require('rewire');

describe('v1/job/index tests', () => {
  const index = rewire('../../../../src/api/v1/job/index');
  const mockSqlPool = new MockMysqlPool();
  Common.databaseJob = new DatabaseJob({ mysql: mockSqlPool });

  describe('Test getJobsByStatus()', async () => {
    it('Full request', async () => {
      mockSqlPool.clearQueryStrings();
      const result = await index.__get__('getJobsByStatus')(
        { query: { status: 'new', limit: 100, offset: 10 } },
        { json: (x) => x },
      );
      const queryStrings: Array<string> = mockSqlPool.getQueryStrings();
      expect(queryStrings.length).to.equal(1);
      expect(result).to.deep.include({
        jobs: [], limit: 100, offset: 10, nextPage: false,
      });
    });

    it('Request without limit', async () => {
      mockSqlPool.clearQueryStrings();
      const result = await index.__get__('getJobsByStatus')(
        { query: { status: 'new', offset: 10 } },
        { json: (x) => x },
      );
      const queryStrings: Array<string> = mockSqlPool.getQueryStrings();
      expect(queryStrings.length).to.equal(1);
      expect(result).to.deep.include({ jobs: [], offset: 10, nextPage: false });
    });

    it('Request without offset', async () => {
      mockSqlPool.clearQueryStrings();
      const result = await index.__get__('getJobsByStatus')(
        { query: { status: 'new', limit: 100 } },
        { json: (x) => x },
      );
      const queryStrings: Array<string> = mockSqlPool.getQueryStrings();
      expect(queryStrings.length).to.equal(1);
      expect(result).to.deep.include({ jobs: [], limit: 100, nextPage: false });
    });

    it('Request without limit and offset', async () => {
      mockSqlPool.clearQueryStrings();
      const result = await index.__get__('getJobsByStatus')(
        { query: { status: 'new' } },
        { json: (x) => x },
      );
      const queryStrings: Array<string> = mockSqlPool.getQueryStrings();
      expect(queryStrings.length).to.equal(1);
      expect(result).to.deep.include({ jobs: [], nextPage: false });
    });
  });

  describe('Test postToJobId()', async () => {
    it('Accept', async () => {
      mockSqlPool.clearQueryStrings();
      const result = await index.__get__('postToJobId')(
        { body: { operation: 'accept' }, params: { id: '12345' } },
        { json: (x) => x },
      );
      const queryStrings: Array<string> = mockSqlPool.getQueryStrings();
      expect(queryStrings.length).to.equal(1);
      expect(result).to.deep.equal({ success: true, operation: 'accept', id: '12345' });
    });

    it('Decline', async () => {
      mockSqlPool.clearQueryStrings();
      const result = await index.__get__('postToJobId')(
        { body: { operation: 'decline' }, params: { id: '12345' } },
        { json: (x) => x },
      );
      const queryStrings: Array<string> = mockSqlPool.getQueryStrings();
      expect(queryStrings.length).to.equal(1);
      expect(result).to.deep.equal({ success: true, operation: 'decline', id: '12345' });
    });

    it('Unknown operation', async () => {
      mockSqlPool.clearQueryStrings();
      const result = await index.__get__('postToJobId')(
        { body: { operation: 'unknown_operation' }, params: { id: '12345' } },
        { json: (x) => x },
      );
      const queryStrings: Array<string> = mockSqlPool.getQueryStrings();
      expect(queryStrings.length).to.equal(0);
      expect(result).to.deep.equal({ success: false, operation: 'unknown_operation', id: '12345' });
    });
  });
});
