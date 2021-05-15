import { DatabaseBase } from './database-base';

export class DatabaseJob extends DatabaseBase {
  async listJobs(status: string, limit: number = 20, offset: number = 0): Promise<string[]> {
    if (this.implementation) {
      return this.implementation.listJobs(status, limit, offset);
    }
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
