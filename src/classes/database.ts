// Se importa el módulo de mongoose para realizar la conexión con MongoDB
import mongoose from 'mongoose';

// Models
import User from '../models/userMdl';
import Post from '../models/postMdl';

// Fake Users and Posts Registers
import { users, posts } from '../data/index';

export default class Database {
  private static _instance: Database;
  private constructor() { }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  start(): void {
    const db: any = process.env.DB;

    // Se indica que la conexión será mediante Promesas
    mongoose.Promise = global.Promise;

    // Se establece la conexión a la base de datos mediande el método connect
    mongoose
      .connect(db)
      .then(() => {
        //   Si la conexión es exitosa se emite el siguiente mensaje
        console.log('\x1b[36m\x1b[1m', 'Data Base Status:', '\x1b[32m', 'Connected', '\x1b[0m');
        console.log('\x1b[37m\x1b[1m', '========================================================', '\x1b[0m');

        // ADD FAKE REGISTERS ONE TIME
        // User.insertMany(users);
        // Post.insertMany(posts);

      })
      //   Si la conexión es fallida se muestra el error
      .catch((err: any) => {
        console.log('\x1b[36m\x1b[1m', 'Data Base Status:', '\x1b[31m', 'Disconnected', '\x1b[0m');
        console.log('\x1b[37m\x1b[1m', '========================================================', '\x1b[0m');
        console.log(err);
      });
  }
}
