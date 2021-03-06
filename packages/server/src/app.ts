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
  addProductsToCartRouter, deleteProductInCartRouter,
  fetchDashboardRouter,
  fetchProductsByCateIDRouter,
  fetchProductsByUserIDRouter,
  indexRootRouter, paymentRouter,
  seedRouter,
} from './routes';
import { BaseRoute } from './routes/base-route';
import { ECommons } from './commons';

const hostname = process.env.APP_HOST;
const port = process.env.APP_PORT;
const isDev = process.env.APP_ENV || ECommons.Dev;

const app = express();
app.set('trust proxy', true);
app.use(json());
// @ts-ignore
app.use(cors(corsConfig()));

// eslint-disable-next-line no-unused-expressions
isDev !== ECommons.Dev && app.use(morgan('combined', { stream: new LoggerStream() }));
app.use(helmet());

// Routes
// Routes: API Doc
app.use(BaseRoute.Docs, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Routes: Root
app.use(indexRootRouter);
// Routes: Seed
app.use(seedRouter);
// Routes: Products
app.use(fetchDashboardRouter);
app.use(fetchProductsByCateIDRouter);
app.use(fetchProductsByUserIDRouter);
app.use(addProductsToCartRouter);
app.use(deleteProductInCartRouter);
// Routes: Pay
app.use(paymentRouter);

app.all('*', async () => {
  throw new Error('API not available!');
});

export { app };
