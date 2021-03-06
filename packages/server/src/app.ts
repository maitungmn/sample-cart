import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cors from 'cors';

import helmet from 'helmet';
import morgan from 'morgan';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';

import corsConfig from './libs/cors';
import { LoggerStream } from './libs/winston';
import {
  fetchDashboardRouter,
  indexRootRouter,
  seedRouter,
} from './routes';
import { ECommons } from './commons';

const hostname = process.env.APP_HOST;
const port = process.env.APP_PORT;
const isDev = process.env.APP_ENV || ECommons.Dev;

const app = express();
app.set('trust proxy', true);
app.use(json());
// @ts-ignore
app.use(cors(corsConfig({ hostname, port })));

// eslint-disable-next-line no-unused-expressions
isDev !== ECommons.Dev && app.use(morgan('combined', { stream: new LoggerStream() }));
app.use(helmet());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(indexRootRouter);
app.use(seedRouter);
app.use(fetchDashboardRouter);

app.all('*', async () => {
  throw new Error('API not available!');
});

export { app };
