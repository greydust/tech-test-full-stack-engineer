import { EventEmitter } from 'events';
import {
  Pool, RowDataPacket, FieldPacket, QueryOptions, PoolConnection,
} from 'mysql2/promise';

class MockMysqlPool extends EventEmitter implements Pool {
  #queryStrings: Array<string> = [];

  getQueryStrings(): Array<string> {
    return this.#queryStrings;
  }

  clearQueryStrings(): void {
    this.#queryStrings = [];
  }

  async query(
    queryString: string | QueryOptions,
    _values?: any,
  ): Promise<[RowDataPacket[], FieldPacket[]]> {
    if (typeof queryString === 'string') {
      this.#queryStrings.push(queryString);
    }
    return [[], []];
  }

  async execute(
    queryString: string | QueryOptions,
    _values?: any,
  ): Promise<[RowDataPacket[], FieldPacket[]]> {
    if (typeof queryString === 'string') {
      this.#queryStrings.push(queryString);
    }
    return [[], []];
  }

  async getConnection(): Promise<PoolConnection> {
    return null;
  }

  on(_event: string, _listener: (connection: PoolConnection) => any): this {
    return this;
  }

  async end(): Promise<void> {
  }
}

export default MockMysqlPool;
