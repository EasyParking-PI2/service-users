import RethinDBConnection from "../infra/RethinkDBConnection";
import rethinkdb, { ReqlError, WriteResult } from 'rethinkdb';
import { User } from "../types/User.type";

export default class UserModel {
  table: string;
  database = "easy-parking";

  constructor() {
    this.table = 'users';
  }

  async create(user: User): Promise<WriteResult> {
    try {
      const connection = RethinDBConnection.connect();
      if (!connection) throw new Error('Connection not established');
      return await rethinkdb.db(this.database).table('users').insert(user).run(connection);
      
    } catch (err) {
      throw err;
    }
  }

  // async get(id) {
  //   const result = await connection.table(this.table).get(id).run();
  //   return result;
  // }

  // async update(id, user) {
  //   const result = await connection.table(this.table).get(id).update(user).run();
  //   return result;
  // }

  // async delete(id) {
  //   const result = await connection.table(this.table).get(id).delete().run();
  //   return result;
  // }
}