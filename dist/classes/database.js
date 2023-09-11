"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Se importa el módulo de mongoose para realizar la conexión con MongoDB
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor() { }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    start() {
        const db = process.env.DB;
        // Se indica que la conexión será mediante Promesas
        mongoose_1.default.Promise = global.Promise;
        // Se establece la conexión a la base de datos mediande el método connect
        mongoose_1.default
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
            .catch((err) => {
            console.log('\x1b[36m\x1b[1m', 'Data Base Status:', '\x1b[31m', 'Disconnected', '\x1b[0m');
            console.log('\x1b[37m\x1b[1m', '========================================================', '\x1b[0m');
            console.log(err);
        });
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map