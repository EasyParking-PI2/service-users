import RethinDBConnection from "../infra/RethinkDBConnection";
import rethinkdb, { WriteResult } from 'rethinkdb';
import { User } from "../types/User.type";
import bcrypt from "bcrypt";


export default class UserModel {
  table: string;
  database = rethinkdb.db("easy-parking");

  constructor() {
    this.table = 'users';
  }

  /**
   * Inset a user into the database
   * @param user 
   * @returns the user created
   * @throws error if the connection is not established
   */
  async create(user: User): Promise<WriteResult> {
    try {
      const connection = RethinDBConnection.connect();
      if (!connection) throw new Error('Connection not established');
      return await this.database.table('users').insert(user).run(connection);

    } catch (err) {
      throw err;
    }
  }

  /**
   * Get a user by login
   * @param login 
   * @returns the user found or null
   * @throws error if the connection is not established
   */
  async getByLogin(login: string): Promise<User | null> {
    try {
      const connection = RethinDBConnection.connect();
      if (!connection) throw new Error('Connection not established');
      const result = await this.database.table('users').filter({ login }).run(connection);

      const arrResult = await result.toArray();

      if (arrResult.length === 0) return null;

      return arrResult[0] as User;

    } catch (err) {
      throw err;
    }
  }

  /**
   * Get a user by id
   * @param id 
   * @returns the user found or null
   * @throws error if the connection is not established
   */
  async getById(id: string): Promise<User | null> {
    try {
      const connection = RethinDBConnection.connect();
      if (!connection) throw new Error('Connection not established');
      const result = await this.database.table('users').get(id).run(connection);

      return result as User;

    } catch (err) {
      throw err;
    }
  }

  /**
   * Update a user
   * @param id 
   * @param user 
   * @returns the user
   * @throws error if the connection is not established
   */
  async update(id: string, user: User): Promise<WriteResult> {
    try {
      const connection = RethinDBConnection.connect();
      if (!connection) throw new Error('Connection not established');


      return await this.database.table('users').get(id).update(user).run(connection);

    } catch (err) {
      throw err;
    }
  }


  /**
   * Compare two passwords using bcrypt
   * @param password1 the first password to compare 
   * @param password2 the sencod password to compare
   * @returns 
   */
  async comparePasswords(password1: string, password2: string): Promise<boolean> {
    return await bcrypt.compare(password1, password2);
  }

  /**
   * Hashes a password using bcrypt
   * @param password to be hashed
   * @returns the password hashed
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  // async delete(id) {
  //   const result = await connection.table(this.table).get(id).delete().run();
  //   return result;
  // }
}