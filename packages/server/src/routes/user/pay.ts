import express, { Request, Response } from 'express';
import { baseAPI, BaseRoute } from '../base-route';
import {
  Users,
} from '../../models';
import { ECommons } from '../../commons';
import { requiredAuth, validateRequest } from '../../middlewares';

const router = express.Router();

export const baseUserPayRoute = `${baseAPI + BaseRoute.Payment}`;

router.post(
  baseUserPayRoute,
  requiredAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      name,
      address,
      phone,
      email,
    } = req.body;

    const userID = req.headers.authorization;

    if (!name || !address || !phone || !email) {
      res.status(400).send({ error: ECommons.InvalidBody });
      return;
    }

    try {
      const user = await Users.findOneAndUpdate({ userID }, {
        $set: {
          name,
          address,
          phone,
          email,
          cart: [],
        },
      }, { useFindAndModify: false });

      if (!user) {
        res.status(400).send({ error: ECommons.NotFoundUser });
        return;
      }

      res.status(200).send({ data: user });
    } catch (e) {
      res.status(400).send({ error: e.message.replace(/"/g, "'") });
    }
  },
);

export { router as paymentRouter };
