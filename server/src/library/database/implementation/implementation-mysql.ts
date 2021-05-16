import * as mysql2Promise2 from 'mysql2/promise';
import moment from 'moment';

import ImplementationBase from './implementation-base';

class ImplementationMysql implements ImplementationBase {
  #mysqlConnection: mysql2Promise2.Pool = null;

  constructor(mysqlConnection: mysql2Promise2.Pool) {
    this.#mysqlConnection = mysqlConnection;
  }

  async listJobs(status: string, limit: number = 20, offset: number = 0): Promise<any> {
    const queryString = `SELECT jobs.*, suburbs.name as suburbs_name, suburbs.postcode, categories.name as categories_name FROM jobs LEFT JOIN suburbs ON jobs.suburb_id = suburbs.id LEFT JOIN categories on jobs.category_id = categories.id WHERE status = '${status}' ORDER BY jobs.id LIMIT ${limit} OFFSET ${offset}`;
    const [results] = await this.#mysqlConnection.query(queryString);
    return results;
  }

  async acceptJob(id: string): Promise<void> {
    const updateTime = moment().utc().format('YYYY-MM-DD hh:mm:ss');
    const queryString = `UPDATE jobs SET status = 'accepted', update_at = '${updateTime}' WHERE id = ${id} AND status = 'new'`;
    await this.#mysqlConnection.query(queryString);
  }

  async declineJob(id: string): Promise<void> {
    const updateTime = moment().utc().format('YYYY-MM-DD hh:mm:ss');
    const queryString = `UPDATE jobs SET status = 'declined', update_at = '${updateTime}' WHERE id = ${id} AND status = 'new'`;
    await this.#mysqlConnection.query(queryString);
  }
}

export default ImplementationMysql;
