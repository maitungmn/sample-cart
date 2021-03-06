import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Types } from 'mongoose';
import { baseAPI, BaseRoute } from '../base-route';
import {
  Users,
} from '../../models';

const router = express.Router();

export const baseAddProductsToCartRoute = `${baseAPI + BaseRoute.Products}/:productID`;

router.post(
  baseAddProductsToCartRoute,
  async (req: Request, res: Response) => {
    const { productID } = req.params;

    let user: any;
    const userID = req.headers.authorization || '';
    try {
      if (userID) {
        user = await Users.findOne({ userID });
      }

      if (!userID || !user) {
        user = await Users.create({
          userID: userID || uuidv4(),
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
