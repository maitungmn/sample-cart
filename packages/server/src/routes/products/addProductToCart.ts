import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import { baseAPI, BaseRoute } from '../base-route';
import {
  Users,
} from '../../models';
import { requiredAuth } from '../../middlewares';

const router = express.Router();

export const baseAddProductsToCartRoute = `${baseAPI + BaseRoute.Products}/:productID`;

router.post(
  baseAddProductsToCartRoute,
  requiredAuth,
  async (req: Request, res: Response) => {
    const { productID } = req.params;

    let user: any;
    const userID = req.headers.authorization;
    try {
      user = await Users.findOne({ userID });

      if (!user) {
        user = await Users.create({
          userID,
        });
      }

      const newCart = [...(user.cart || []), new Types.ObjectId(productID)];
      await Users.updateOne(
        { userID },
        { cart: newCart },
      );
      user.cart = newCart;
      res.status(200).send({ data: user });
    } catch (e) {
      res.status(400).send({ error: e.message.replace(/"/g, "'") });
    }
  },
);

export { router as addProductsToCartRouter };
