import RethinDBConnection from "../infra/RethinkDBConnection";
import rethinkdb, {ReqlError, WriteResult} from 'rethinkdb';
import { User } from "../types/User.type";

export default class UserModel {
  table: string;

  constructor() {
    this.table = 'users';
  }

  async create(user:User) {
    try{
      const connection = RethinDBConnection.connect();
      if(!connection) throw new Error('Connection not established');
  
      rethinkdb.db('easy-parking1').table('users').insert(user).run(connection, (err:ReqlError, result:WriteResult)=>{
        if (err) throw err;
        console.log(result);
      });
    }catch(err){
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