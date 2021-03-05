import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';

import { indexFormRouter } from './routes';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(indexFormRouter);

app.all('*', async () => {
  throw new Error('API not available!');
});

export { app };
