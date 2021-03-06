import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import { baseAPI, BaseRoute } from '../base-route';
import {
  Users,
} from '../../models';
import { ECommons } from '../../commons';

const router = express.Router();

export const baseDeleteProductInCartRoute = `${baseAPI + BaseRoute.Products}/:productID`;

router.delete(
  baseDeleteProductInCartRoute,
  async (req: Request, res: Response) => {
    const { productID } = req.params;

    const userID = req.headers.authorization;
    if (!userID) {
      res.status(400).send({ error: ECommons.MissingUserID });
      return;
    }

    try {
      const user = await Users.findOne({ userID });
      if (!user) {
        res.status(400).send({ error: ECommons.NotFoundUser });
        return;
      }

      // need to write like this to get full test coverage -_-!
      let indexOfProduct: number = -1;
      if (user.cart?.length) {
        const cloneUserCart = user.cart.map((i) => new Types.ObjectId(i).toHexString());
        indexOfProduct = cloneUserCart.indexOf(productID);
      }

      if (user.cart?.length && indexOfProduct >= 0) {
        user.cart.splice(indexOfProduct, 1);
        await Users.updateOne({ userID }, { cart: user.cart });
      }

      res.status(200).send({ data: user });
    } catch (e) {
      res.status(400).send({ error: e.message.replace(/"/g, "'") });
    }
  },
);

export { router as deleteProductInCartRouter };
