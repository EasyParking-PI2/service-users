import rethinkdb from 'rethinkdb';
import UserModel from '../models/user.model';
import { Profile } from '../types/User.type';

export default class ConnectionDB {

  private static connection = null as rethinkdb.Connection | null;
  public static connect() {
    if (this.connection) return this.connection;

    rethinkdb.connect({ host: 'rethinkdb', port: 28015 }).then((connection) => {
      this.connection = connection
    }).catch((err) => {
      console.log(err);
      throw new err;
    });

    return this.connection;
  }

  public static createDatabaseIfNotExists() {

    rethinkdb.connect({ host: 'rethinkdb', port: 28015 }).then((connection) => {
      if (!connection) throw new Error('Connection not established');

      rethinkdb.dbList().run(connection).then((dbs) => {
        if (!dbs.includes('easy-parking')) {
          if (!connection) throw new Error('Connection not established');

          console.log('Creating database easy-parking');
          rethinkdb.dbCreate('easy-parking').run(connection);
        }

        this.createTableIfNotExists(connection);
      }).catch((err) => {
        console.log(err);
        throw new err;
      });
    });

  };

  private static createTableIfNotExists(connection: rethinkdb.Connection) {
    rethinkdb.db('easy-parking').tableList().run(connection).then((tables) => {
      if (!tables.includes('users')) {
        console.log('Creating table users');
        rethinkdb.db('easy-parking').tableCreate('users').run(connection).then(() => {
          this.createAdminUserIfNotExists(connection);
        });
      }
    }).catch((err) => {
      console.log(err);
      throw new err;
    });
  }

  private static createAdminUserIfNotExists(connection: rethinkdb.Connection) {
    rethinkdb.db('easy-parking').table('users').filter({ login: 'admin' }).run(connection).then((users) => {
      users.toArray().then((arrUsers) => {
        if (arrUsers.length === 0) {

          console.log('Creating admin user');

          const userModel = new UserModel();
          userModel.hashPassword('admin').then((password) => {
            const user = {
              login: 'admin',
              password,
              name: 'admin',
              email: 'admin@admin.com',
              cpf: '000.000.000-00',
              phone: '(00) 0000-00000',
              profile: Profile.ADMIN
            }

            rethinkdb.db('easy-parking').table('users').insert(user).run(connection);
          });

        }
      });
    }).catch((err) => {
      console.log(err);
      throw new Error('Error creating admin user');
    });
  }
}
