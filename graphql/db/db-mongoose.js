import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

import { DATABASE_URL, } from './../config';

export function dbConnect(url = DATABASE_URL) {
  return mongoose.connect(url)
    .catch((err) => {
      console.error('Mongoose failed to connect');
      console.error(err);
    });
}

export function dbDisconnect() {
  return mongoose.disconnect();
}

export function dbGet() {
  return mongoose;
}
