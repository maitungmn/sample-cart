import express, { Request, Response } from 'express';
import { baseAPI, BaseRoute } from '../base-route';
import {
  Categories,
  Products,
} from '../../models';

const router = express.Router();

export const baseFetchProductsByCateIDRoute = `${baseAPI + BaseRoute.Products}/:cateID`;

router.get(
  baseFetchProductsByCateIDRoute,
  async (req: Request, res: Response) => {
    let result: any;
    try {
      const cate = await Categories.findById(req.params.cateID);
      if (!cate || !cate.productIDs?.length) {
        result = [];
      } else {
        result = await Products.find(
          {
            _id: {
              $in: cate.productIDs,
            },
          },
        );
      }
      res.status(200).send({ data: result });
    } catch (e) {
      res.status(400).send({ error: e.message.replace(/"/g, "'") });
    }
  },
);

export { router as fetchProductsByCateIDRouter };
