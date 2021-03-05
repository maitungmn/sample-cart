// import mongoose from "mongoose"
import * as dotenv from 'dotenv';
import { app } from './app';

dotenv.config();
const port = process.env.APP_PORT || 5000;

const start = async () => {
  // eslint-disable-next-line no-console
  console.log('Starting...');

  // if (!process.env.HOST_MONGO) {
  //   throw new Error('HOST_MONGO must be defined')
  // }

  // try {
  //   await mongoose.connect(process.env.HOST_MONGO, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useCreateIndex: true,
  //   })
  //   console.log('Connected to MongoDb')
  // } catch (e) {
  //   console.error(e)
  // }
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
  });
};

start();
