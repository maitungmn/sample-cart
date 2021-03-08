import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
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
        const products = await Products.find(
          {
            _id: {
              $in: user.cart,
            },
          },
        );

        if (products?.length) {
          const productsPool: [string, any][] = products.map(
            (i) => [new Types.ObjectId(i._id).toHexString(), i],
          );
          const productsMap = new Map<string, any>(productsPool);
          result = user.cart.map((i) => {
            const prod = productsMap.get(new Types.ObjectId(i).toHexString());
            if (prod) {
              prod.id = prod._id;
              delete prod._id;
              return prod;
            }
            return undefined;
          });
        } else {
          result = [];
        }
      }
      res.status(200).send({ data: result });
    } catch (e) {
      res.status(400).send({ error: e.message.replace(/"/g, "'") });
    }
  },
);

export { router as fetchProductsByUserIDRouter };
