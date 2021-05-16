import * as _ from 'lodash';
import { DatabaseBase } from './database-base';

class DatabaseJob extends DatabaseBase {
  async listJobs(status: string, limit: number = 20, offset: number = 0): Promise<any[]> {
    if (this.implementation) {
      const jobs = await this.implementation.listJobs(status, limit, offset);
      if (status === 'accepted') {
        return jobs;
      }
      return jobs.map((job) => _.omit(job, ['contact_phone', 'contact_email']));
    }
    return [];
  }

  async acceptJob(id: string): Promise<void> {
    if (this.implementation) {
      await this.implementation.acceptJob(id);
    }
  }

  async declineJob(id: string): Promise<void> {
    if (this.implementation) {
      await this.implementation.declineJob(id);
    }
  }
}

export default DatabaseJob;
