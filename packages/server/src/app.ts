import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cors from 'cors';

import { indexFormRouter } from './routes';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors());

app.use(indexFormRouter);

app.get('/', (req, res) => res.json({ foo: 'buzz' }));
app.all('*', async () => {
  throw new Error('API not available!');
});

export { app };
