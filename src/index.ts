if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config();
}

import Database from './classes/database';
import Server from './classes/server';

Database.instance.start();
Server.instance.start();