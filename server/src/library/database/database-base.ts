import * as mysql2Promise from 'mysql2/promise';
import { ImplementationBase } from './implementation/implementation-base';
import { ImplementationMysql } from './implementation/implementation-mysql';

export interface DatabaseHandler {
  mysql?: mysql2Promise.Pool
}

export class DatabaseBase {
  protected implementation: ImplementationBase = null;

  constructor(handler: DatabaseHandler) {
    if (handler.mysql) {
      this.implementation = new ImplementationMysql(handler.mysql);
    }
  }
}
