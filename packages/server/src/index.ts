import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { app } from './app';

dotenv.config();
const port = process.env.APP_PORT || 5000;

(async () => {
  if (!process.env.HOST_MONGO) {
    throw new Error('HOST_MONGO must be defined');
  }

  try {
    const hostMongo = process.env.HOST_MONGO;
    await mongoose.connect(hostMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    throw Error(e);
  }
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
  });
})();
