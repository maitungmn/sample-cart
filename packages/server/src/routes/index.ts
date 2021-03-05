import express, { Response, Request } from 'express';
import { BaseRoute } from './base-route';

const router = express.Router();

router.get(BaseRoute.API, async (req: Request, res: Response) => {
  res.status(200).send({});
});

export { router as indexFormRouter };
