import { EventEmitter } from 'events';
import { Pool, RowDataPacket, FieldPacket, QueryOptions, PoolConnection} from 'mysql2/promise.js';

export class MockMysqlPool extends EventEmitter implements Pool {
  #queryStrings: Array<string> = [];

  getQueryStrings(): Array<string> {
    return this.#queryStrings;
  }

  clearQueryStrings(): void {
    this.#queryStrings = [];
  }

  async query(queryString: string | QueryOptions, values?: any): Promise<[RowDataPacket[], FieldPacket[]]> {
    if (typeof queryString === 'string') {
      this.#queryStrings.push(queryString);
    }
    return [[], []];
  }

  async execute(queryString: string | QueryOptions, values?: any): Promise<[RowDataPacket[], FieldPacket[]]> {
    if (typeof queryString === 'string') {
      this.#queryStrings.push(queryString);
    }
    return [[], []];
  }

  async getConnection(): Promise<PoolConnection> {
    return null;
  }

  on(event: string, listener: (connection: PoolConnection) => any): this {
    return this;
  }

  async end(): Promise<void> {
  }
}