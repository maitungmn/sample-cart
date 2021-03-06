import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import { baseAPI, BaseRoute } from './base-route';
import { ECommons } from '../commons';
import {
  Categories,
  CategoriesDoc,
  Products,
  ProductsAttrs,
} from '../models';

const router = express.Router();

export const baseFetchDashBoardRoute = baseAPI + BaseRoute.Dashboard;

export const fetchCate = () => Categories.find({});

export const convertCate = (categories: Partial<CategoriesDoc>[]) => categories.map((i) => ({
  title: i.title,
  id: i.id,
}));

export const fetchProducts = (ids: Types.ObjectId[]) => {
  if (!ids.length) return [];
  return Products.find(
    {
      _id: { $in: ids },
    },
  );
};

router.get(
  baseFetchDashBoardRoute,
  async (req: Request, res: Response) => {
    let result: any;
    let productsFirstCate: ProductsAttrs[] = [];
    try {
      const categories = await fetchCate();
      if (!categories.length) {
        result = [];
      } else {
        result = convertCate(categories);
        const ids = categories[0].productIDs || [];
        productsFirstCate = await fetchProducts(ids);
      }
    } catch (e) {
      res.status(400).send({ message: ECommons.DefaultError });
    }

    res.status(200).send({
      data:
        {
          categories: result,
          productsFirstCate,
        },
    });
  },
);

export { router as fetchDashboardRouter };
