import rethinkdb from 'rethinkdb';

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
}
