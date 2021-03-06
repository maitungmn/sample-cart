import express, { Response, Request } from 'express';
import { baseAPI, BaseRoute } from './base-route';
import { Products, ProductsAttrs } from '../models/products';
import { Categories, CategoriesAttrs } from '../models/categories';
import { ECommons } from '../commons';

const router = express.Router();

export const baseSeedAPI = baseAPI + BaseRoute.Seed;

export const productsSeedData = (): ProductsAttrs[] => {
  const result: ProductsAttrs[] = [];

  for (let i = 0; i < 30; ++i) {
    result.push({
      name: `Product ${i + 1}`,
      imageUrl: ECommons.DefaultImageUrl,
      price: Math.floor(Math.random() * 150) + 1,
    });
  }

  return result;
};

export const categoriesSeedData = (productsSeeded: ProductsAttrs[]): CategoriesAttrs[] => {
  const result: CategoriesAttrs[] = [];
  if (!productsSeeded.length) return result;

  for (let i = 0; i < 3; ++i) {
    result.push({
      title: `Category  ${i + 1}`,
      productIDs: productsSeeded.slice(i * 10, (i + 1) * 10).map((i) => i.id!),
    });
  }

  return result;
};

router.post(
  baseSeedAPI,
  async (req: Request, res: Response) => {
    try {
      const productsSeeded = await Products.insertMany(productsSeedData());
      const rawCateSeedData = categoriesSeedData(productsSeeded);
      await Categories.insertMany(rawCateSeedData);

      res.status(200).send({ message: 'Done!' });
    } catch (e) {
      res.status(400).send({ message: ECommons.DefaultError });
    }
  },
);

export { router as seedRouter };
