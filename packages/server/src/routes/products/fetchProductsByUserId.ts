import express, { Request, Response } from 'express';
import { baseAPI, BaseRoute } from '../base-route';
import {
  Products, Users,
} from '../../models';
import { requiredAuth } from '../../middlewares';

const router = express.Router();

export const baseFetchProductsByUserIDRoute = `${baseAPI + BaseRoute.Products}`;

router.get(
  baseFetchProductsByUserIDRoute,
  requiredAuth,
  async (req: Request, res: Response) => {
    let result: any;
    const userID = req.headers.authorization;

    try {
      const user = await Users.findOne({ userID });
      if (!user || !user.cart?.length) {
        result = [];
      } else {
        result = await Products.find(
          {
            _id: {
              $in: user.cart,
            },
          },
        );
      }
      res.status(200).send({ data: result || [] });
    } catch (e) {
      res.status(400).send({ error: e.message.replace(/"/g, "'") });
    }
  },
);

export { router as fetchProductsByUserIDRouter };
