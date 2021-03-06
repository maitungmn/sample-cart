import express, { Response, Request } from 'express';
import { baseAPI } from './base-route';

const router = express.Router();

router.get(baseAPI, async (req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

export { router as indexRootRouter };
